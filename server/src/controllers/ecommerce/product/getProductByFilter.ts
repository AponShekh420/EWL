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
    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 }; // default
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
    if (query.minPrice && query.maxPrice) {
      searchQuery.salePrice = {
        $gte: Number(query.minPrice),
        $lte: Number(query.maxPrice),
      };
    }

    if (query.sort) {
      if (query.sort === "popularity") {
        sortQuery = { sold: -1 };
      } else if (query.sort === "average-rating") {
        sortQuery = { averageRating: -1 };
      } else if (query.sort === "price-low-to-high") {
        sortQuery = { salePrice: 1 };
      } else if (query.sort === "price-high-to-low") {
        sortQuery = { salePrice: -1 };
      }
    }

    const products = await productModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit)
      .populate("reviews")
      .sort(sortQuery);

    if (!products) {
      return next(createError(400, "Not found products"));
    }
    const product = await productModel.findOne().sort({ salePrice: -1 });
    const total = await productModel.countDocuments();
    res.status(200).json({
      success: true,
      data: products,
      price: {
        maxPrice: Number(product?.salePrice) || 0,
        minPrice: 0,
      },
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
