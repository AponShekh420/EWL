import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Category ID is required"));

    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(createError(400, "Not found Category"));
    }
    return res.status(200).json({
      success: true,
      data: category,
      message: "Category fetched by id successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
