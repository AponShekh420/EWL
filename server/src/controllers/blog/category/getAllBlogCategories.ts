import { NextFunction, Request, Response } from "express";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { BlogCategoryModel } from "../../../models/BlogCategoryModel";

export const getAllBlogCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await BlogCategoryModel.find();

    res.status(200).json({
      success: true,
      data: categories,
      message: "All blog categories fetched successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
