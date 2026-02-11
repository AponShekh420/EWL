import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CartModel } from "../../../models/CartModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const cart = await CartModel.findOne({ customer: userId }).populate(
      "items.product",
    );
    if (!cart) {
      return next(createError(400, "Not found carts"));
    }
    res.status(200).json({
      success: true,
      data: cart,
      message: "All cart list fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
