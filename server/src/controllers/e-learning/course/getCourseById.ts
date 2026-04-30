import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import courseModel from "../../../models/CourseModel";
import { CourseOrderModel } from "../../../models/CourseOrderModel";

export const getCourseBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let ordered = false;
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Course slug is required"));

    const course = await courseModel.findOne({ slug }).populate("speaker", "firstName lastName avatar _id userName");
    if (!course) {
      return next(createError(400, "Not found course"));
    }
    const order = await CourseOrderModel.findOne({
      "courses._id": course._id,
      customer: req?.user?._id
    });
    if(order) {
      ordered = true
    }
    return res.status(200).json({
      success: true,
      data: course,
      message: "Course fetched by slug successfully",
      ordered
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
