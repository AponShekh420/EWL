import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CartModel } from "../../../models/CartModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carts = await CartModel.find();
    if (!carts) {
      return next(createError(400, "Not found carts"));
    }
    res.status(200).json({
      success: true,
      data: carts,
      message: "All cart fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
