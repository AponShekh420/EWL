import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ResourceCategoryModel } from "../../../models/ResourceCategory";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getResourceCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Category slug is required"));

    const category = await ResourceCategoryModel.findOne({ slug });
    if (!category) {
      return next(createError(400, "Not found Category"));
    }
    return res.status(200).json({
      success: true,
      data: category,
      message: "Resources category fetched by slug successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
