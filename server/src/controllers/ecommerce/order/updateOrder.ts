import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params?.id;
  const body = req.body;
  try {
    if (!id) return next(createError(400, "Order ID is required"));

    // Find old order
    const oldProduct = await OrderModel.findById(id);
    if (!oldProduct) return next(createError(404, "Order not found"));

    const updatedData: Record<string, any> = { ...body };

    // ---- UPDATE ORDER ----
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct)
      return next(createError(400, "Failed to update order"));

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Order updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
