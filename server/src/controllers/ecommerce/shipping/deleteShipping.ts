import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ShippingModel from "../../../models/ShippingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const deleteShipping = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Shipping ID is required"));

    const deletedShipping = await ShippingModel.findByIdAndDelete(id);
    if (!deletedShipping) {
      return next(createError(404, `Shipping with id ${id} not found`));
    }

    return res.status(200).json({
      success: true,
      data: deletedShipping,
      message: `Shipping with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
