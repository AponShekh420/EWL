import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import ReviewModel from "../../../models/ReviewModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  let searchQuery: Record<string, any> = {};

  try {
    if (query.search) {
      const products = await productModel
        .find({
          title: { $regex: query.search, $options: "i" },
        })
        .select("_id");

      if (products.length > 0) {
        searchQuery = { product: { $in: products.map((p) => p._id) } };
      }
    }

    const reviews = await ReviewModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate(["product", "customer"]);

    if (!reviews) {
      return next(createError(400, "Not found review"));
    }
    const total = await ReviewModel.countDocuments();
    res.status(200).json({
      success: true,
      data: reviews,
      message: "All review fetched successfully",
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
