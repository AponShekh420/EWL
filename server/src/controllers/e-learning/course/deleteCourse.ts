import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import courseModel from "../../../models/CourseModel";
import UserModel from "../../../models/UserModel";

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Course ID is required"));

    const deletedCourse = await courseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      return next(createError(404, `Course with id ${id} not found`));
    } else {
      await UserModel.updateOne(
        { courses: { $in: [id] } },   // find category that HAS this product
        { $pull: { courses: id } }     // remove from OLD category
      );
    }

    deleteFileFromLocal(
      [
        deletedCourse.thumbnail,
        deletedCourse?.attachment,
      ].filter((file): file is string => Boolean(file)),
      "courses"
    );
    
    return res.status(200).json({
      success: true,
      status: 201,
      data: deletedCourse,
      message: `Course with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
