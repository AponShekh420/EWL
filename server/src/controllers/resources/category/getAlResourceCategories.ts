import { NextFunction, Request, Response } from "express";
import { ResourceCategoryModel } from "../../../models/ResourceCategory";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllResourceCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await ResourceCategoryModel.find();

    res.status(200).json({
      success: true,
      data: categories,
      message: "All blog categories fetched successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
