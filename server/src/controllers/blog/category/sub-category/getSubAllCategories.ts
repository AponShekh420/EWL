import { NextFunction, Request, Response } from "express";
import { SubCategoryModel } from "../../../../models/CategoryModel";
import { catchErrorSend } from "../../../../utils/catchErrorSend";

export const getSubAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCategories = await SubCategoryModel.find().populate("category");

    res.status(200).json({
      success: true,
      data: subCategories,
      message: "All subcategory fetched successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
