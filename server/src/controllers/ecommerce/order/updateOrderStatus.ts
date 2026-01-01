import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Order ID is required"));
    // Find old product
    const oldProduct = await OrderModel.findById(id);
    if (!oldProduct) return next(createError(404, "Order not found"));
    const { status } = req.body;
    if (!status) return next(createError(400, "Status is required"));
    const updatedData: Record<string, any> = { ...req.body };

    // ---- UPDATE PRODUCT ----
    const updatedProduct = await OrderModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Order status updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
