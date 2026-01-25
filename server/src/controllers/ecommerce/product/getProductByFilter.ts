import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getProductByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery: Record<string, any> = {};

    if (query.search) {
      searchQuery = {
        $or: [{ title: { $regex: query.search, $options: "i" } }],
      };
    }
    if (query.category) {
      searchQuery.category = query.category;
    }
    if (query.tag) {
      searchQuery.tags = { $in: [query.tag] };
    }
    if (query.sort) {
      if (query.sort === "popularity") {
      } else if (query.sort === "average-rating") {
      } else if (query.sort === "price-low-to-high") {
      } else if (query.sort === "price-high-to-low") {
      } else {
      }
    }
    const products = await productModel
      .find(searchQuery)
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
