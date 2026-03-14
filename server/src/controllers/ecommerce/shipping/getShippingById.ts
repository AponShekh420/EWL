import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ShippingModel from "../../../models/ShippingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getShippingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Shipping ID is required"));

    const shipping = await ShippingModel.findById(id).populate(["creator"]);
    if (!shipping) {
      return next(createError(404, `Shipping with id ${id} not found`));
    }

    res.status(200).json({
      success: true,
      data: shipping,
      message: "Shipping fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
