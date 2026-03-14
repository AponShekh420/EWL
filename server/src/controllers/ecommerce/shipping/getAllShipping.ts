import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ShippingModel from "../../../models/ShippingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllShipping = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = req.query;
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  let searchQuery: Record<string, any> = {};

  try {
    if (query.search) {
      searchQuery = { zoneName: { $regex: query.search, $options: "i" } };
    }

    const shippings = await ShippingModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate(["creator"]);

    if (!shippings) {
      return next(createError(400, "Not found shipping"));
    }
    const total = await ShippingModel.countDocuments();
    res.status(200).json({
      success: true,
      data: shippings,
      message: "All shipping fetched successfully",
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
