import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { SubCategoryModel } from "../../../../models/CategoryModel";
import { catchErrorSend } from "../../../../utils/catchErrorSend";

export const getSubCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Subcategory ID is required"));

    const subcategory = await SubCategoryModel.findById(id);
    if (!subcategory) {
      return next(createError(400, "Not found subcategory"));
    }
    return res.status(200).json({
      success: true,
      data: subcategory,
      message: "subcategory fetched by id successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
