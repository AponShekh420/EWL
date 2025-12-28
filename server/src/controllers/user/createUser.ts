import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import UserModel from "../../models/UserModel";
import { catchErrorSend } from "../../utils/catchErrorSend";
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const existEmail = await UserModel.findOne({ email: body.email });
    if (existEmail) {
      return next(createError(409, "User with this email already exists"));
    }
    const existUsername = await UserModel.findOne({ username: body.username });
    if (existUsername) {
      return next(createError(409, "User with this username already exists"));
    }
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    const createdUser = await UserModel.create({
      ...body,
      password: hashedPassword,
    });

    if (!createdUser) {
      return next(createError(400, "Failed to create user"));
    }

    return res.status(201).json({
      success: true,
      data: createdUser,
      message: "User created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
