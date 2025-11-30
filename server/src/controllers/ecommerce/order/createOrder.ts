import dot from "dot-object";
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
    const body = dot.object(req.body);
    const latestOrder = await OrderModel.findOne().sort({ orderId: -1 }).exec();

    const createdOrder = await OrderModel.create({
      ...body,
      orderId: latestOrder ? latestOrder.orderId + 1 : 100,
    });

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
