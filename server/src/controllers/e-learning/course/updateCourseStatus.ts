import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import courseModel from "../../../models/CourseModel";

export const updateCourseStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    const body = req.body;
    if (!id) return next(createError(400, "Course ID is required"));
    // Find old course
    const oldCourse = await courseModel.findById(id);
    if (!oldCourse) return next(createError(404, "Course not found"));

    const updatedData: Record<string, any> = { ...body };
    if (body.status) {
      updatedData.status = body.status;
    }

    // ---- UPDATE COURSE ----
    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course status updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
