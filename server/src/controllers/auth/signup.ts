import createError from 'http-errors';
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import UserModel from "../../models/UserModel";
import { catchErrorSend } from '../../utils/catchErrorSend';
const signup = async (req: Request, res: Response, next: NextFunction) => {

  const user = req.body;
  
  try {
    const hashedPassword = bcrypt.hashSync(user?.password, 10)

    const addUser = new UserModel({
      ...user,
      password: hashedPassword,
      isOrthodoxJew: user?.isOrthodoxJew === "yes" ? true : false,
      keepsMitzvos: user?.keepsMitzvos === "yes" ? true : false,
    })

    const userStatus = await addUser.save();
    if(userStatus) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "User account created successfully!"
      })
    } else {
      next(createError(500, "An error occurred while creating the user account. Please try again."))
    }
  } catch (error: unknown) {
      catchErrorSend(next, error);
  }
}

export default signup;