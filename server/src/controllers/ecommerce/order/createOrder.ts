import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const createdOrder = await OrderModel.create({});

    if (!createdOrder) {
      return next(createError(400, "Failed to create order"));
    }

    return res.status(201).json({
      success: true,
      data: createdOrder,
      message: "Order created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
