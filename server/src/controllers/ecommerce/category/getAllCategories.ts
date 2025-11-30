import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json({
      success: true,
      data: categories,
      message: "All category fetched successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
