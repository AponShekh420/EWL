import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Product slug is required"));

    const product = await productModel.findOne({ slug }).populate({
      path: "reviews",
      populate: {
        path: "customer",
        select: "firstName lastName userName email avatar",
      },
    });
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
