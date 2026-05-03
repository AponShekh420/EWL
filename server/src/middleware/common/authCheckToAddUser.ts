import { NextFunction, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../../models/UserModel";

const authCheckToAddUser = async (req: any, res: Response, next: NextFunction) => {
  const { session } = req.cookies;

  if (session) {
    try {
      const verifyedToken = jwt.verify(
        session,
        process.env.TOKEN_SECRET || "sdfjskldjfkljdflkj",
      );

      if (verifyedToken) {
        const checkValidation = await UserModel.findOne(
          { email: (verifyedToken as JwtPayload).email },
          "-password",
        );
        if (checkValidation) {
          req.user = checkValidation;

          return next();
        } else {
          return next();
        }
      } else {
        return next();
      }
    } catch (err) {
      return next();
    }
  } else {
    return next();
  }
};

export default authCheckToAddUser;
