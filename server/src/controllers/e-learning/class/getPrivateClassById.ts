import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import classModel from "../../../models/ClassModel";
import { ClassOrderModel } from "../../../models/ClassOrderModel";

export const getPrivateClassBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Class slug is required"));

    const classItem = await classModel.findOne({ slug }).populate("speaker", "firstName lastName avatar _id userName");
    if (!classItem) {
      return next(createError(400, "Not found class"));
    }

    return res.status(200).json({
      success: true,
      data: classItem,
      message: "Class fetched by slug successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
