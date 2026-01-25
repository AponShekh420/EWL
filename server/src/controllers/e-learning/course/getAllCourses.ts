import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import courseModel from "../../../models/CourseModel";

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await courseModel.find();
    if (!courses) {
      return next(createError(400, "Not found courses"));
    }
    res.status(200).json({
      success: true,
      data: courses,
      message: "All Courses fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
