import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Category slug is required"));

    const category = await CategoryModel.findOne({ slug });
    if (!category) {
      return next(createError(400, "Not found Category"));
    }
    return res.status(200).json({
      success: true,
      data: category,
      message: "Category fetched by id successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
