import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 10;
    const skip = (page - 1) * limit;
    const orders = await OrderModel.find()
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
