import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ShippingModel from "../../../models/ShippingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const updateShipping = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params?.id;
  const body = req.body;

  try {
    if (!id) return next(createError(400, "Shipping ID is required"));
    // Find old order
    const oldShipping = await ShippingModel.findById(id);
    if (!oldShipping) return next(createError(404, "Shipping not found"));

    const updatedData: Record<string, any> = { ...body };

    // ---- UPDATE Cart ----
    const updatedShipping = await ShippingModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedShipping)
      return next(createError(400, "Failed to update shipping"));

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedShipping,
      message: "Shipping updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
