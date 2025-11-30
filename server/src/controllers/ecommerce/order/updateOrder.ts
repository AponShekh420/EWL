import dot from "dot-object";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params?.id;
  const body = dot.object(req.body);
  try {
    if (!id) return next(createError(400, "Order ID is required"));

    // Find old order
    const oldOrder = await OrderModel.findById(id);
    if (!oldOrder) return next(createError(404, "Order not found"));

    const updatedData: Record<string, any> = { ...body };

    // ---- UPDATE ORDER ----
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedOrder) return next(createError(400, "Failed to update order"));

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "Order updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
