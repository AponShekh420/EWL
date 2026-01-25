import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import courseModel from "../../../models/CourseModel";

export const getCourseBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Course slug is required"));

    const course = await courseModel.findOne({ slug });
    if (!course) {
      return next(createError(400, "Not found course"));
    }
    return res.status(200).json({
      success: true,
      data: course,
      message: "Course fetched by slug successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
