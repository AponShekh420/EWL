import { NextFunction, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../../models/UserModel";

const authCheck = async (req: any, res: Response, next: NextFunction) => {
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
          return next(createError(403, "Authentication Problem"));
        }
      } else {
        return next(createError(403, "Authentication Problem"));
      }
    } catch (err) {
      console.log(err);
      return next(createError(401, "Invalid or expired token"));
    }
  } else {
    return next(createError(403, "Authentication Problem"));
  }
};

export default authCheck;
