import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import classModel from "../../../models/ClassModel";

export const getAllClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classes = await classModel.find();
    if (!classes) {
      return next(createError(400, "Not found classes"));
    }
    res.status(200).json({
      success: true,
      data: classes,
      message: "All Classes fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
