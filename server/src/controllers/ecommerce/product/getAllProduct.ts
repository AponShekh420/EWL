import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return next(createError(400, "Not found products"));
    }
    res.status(200).json({
      success: true,
      data: products,
      message: "All Product fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
