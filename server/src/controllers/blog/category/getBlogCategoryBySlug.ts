import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { BlogCategoryModel } from "../../../models/BlogCategoryModel";

export const getBlogCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Category slug is required"));

    const category = await BlogCategoryModel.findOne({ slug });
    if (!category) {
      return next(createError(400, "Not found Category"));
    }
    return res.status(200).json({
      success: true,
      data: category,
      message: "Blog category fetched by slug successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
