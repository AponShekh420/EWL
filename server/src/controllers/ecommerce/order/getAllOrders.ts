import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllOrder = async (
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

    const orders = await OrderModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate(["products", "customer"]);
    if (!orders) {
      return next(createError(400, "Not found orders"));
    }
    const total = await OrderModel.countDocuments();
    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All orders fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
