import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import { BlogCategoryModel } from "../../../models/BlogCategoryModel";

export const deleteBlogCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Category ID is required"));

    const deletedCategory = await BlogCategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return next(createError(404, `Category with id ${id} not found`));
    }

    deleteFileFromLocal(deletedCategory.thumbnail, "blog-category");

    return res.status(200).json({
      success: true,
      data: deletedCategory,
      message: "Category deleted successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
