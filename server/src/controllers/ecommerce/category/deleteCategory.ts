import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Category ID is required"));

    const deletedProduct = await CategoryModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(createError(404, `Category with id ${id} not found`));
    }

    deleteFileFromLocal(deletedProduct.thumbnail, "category");

    return res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "Category deleted successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
