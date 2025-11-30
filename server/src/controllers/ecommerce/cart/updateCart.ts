import dot from "dot-object";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params?.id;
  const body = dot.object(req.body);

  try {
    if (!id) return next(createError(400, "Cart ID is required"));
    // Find old order
    const oldCart = await OrderModel.findById(id);
    if (!oldCart) return next(createError(404, "Cart not found"));

    const updatedData: Record<string, any> = { ...body };

    // ---- UPDATE Cart ----
    const updatedCart = await OrderModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCart) return next(createError(400, "Failed to update cart"));

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedCart,
      message: "Cart updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
