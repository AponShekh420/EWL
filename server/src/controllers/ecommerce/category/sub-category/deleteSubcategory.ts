import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { SubCategoryModel } from "../../../../models/CategoryModel";
import { catchErrorSend } from "../../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../../utils/deleteFileFromLocal";

export const deleteSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Subategory ID is required"));

    const deletedProduct = await SubCategoryModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(createError(404, `Subcategory with id ${id} not found`));
    }

    deleteFileFromLocal(deletedProduct.image, "category");

    return res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
