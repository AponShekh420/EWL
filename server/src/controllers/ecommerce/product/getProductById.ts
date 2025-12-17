import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Product ID is required"));

    const product = await productModel.findById(id);
    if (!product) {
      return next(createError(400, "Not found product"));
    }
    return res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched by id successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
