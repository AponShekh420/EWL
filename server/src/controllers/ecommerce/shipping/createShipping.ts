import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ShippingModel from "../../../models/ShippingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
export const createShipping = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { zoneName, region, shippingMethods } = req.body;
    console.log(shippingMethods, zoneName);
    const userId = req.user?._id;

    const createdShipping = await ShippingModel.create({
      creator: userId,
      zoneName,
      region,
      shippingMethods,
    });

    if (!createdShipping) {
      return next(createError(400, "Failed to add shipping"));
    }
    return res.status(201).json({
      success: true,
      data: createdShipping,
      message: "Shipping created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
