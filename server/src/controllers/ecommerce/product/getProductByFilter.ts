import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { productFilterQuery } from "../../../utils/productFilterQuery";

export const getProductByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await productModel
      .find(productFilterQuery(req))
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("reviews");

    if (!products) {
      return next(createError(400, "Not found products"));
    }

    const total = await productModel.countDocuments();
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All Product fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
