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
    const orders = await OrderModel.find();
    if (!orders) {
      return next(createError(400, "Not found orders"));
    }
    res.status(200).json({
      success: true,
      data: orders,
      message: "All orders fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
