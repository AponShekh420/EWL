import createError from 'http-errors';
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import UserModel from "../../models/UserModel";
const signup = async (req: Request, res: Response, next: NextFunction) => {

  const user = req.body;

  const hashedPassword = bcrypt.hashSync(user.password, 10)

  const addUser = new UserModel({
    ...user,
    password: hashedPassword
  })

  const userStatus = await addUser.save();
  if(userStatus) {
    res.status(200).json({
      message: "User account created successfully!"
    })
  } else {
    next(createError(500, "An error occurred while creating the user account. Please try again."))
  }
}

export default signup;