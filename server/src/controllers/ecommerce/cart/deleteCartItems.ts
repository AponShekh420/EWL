import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { CartModel } from "../../../models/CartModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const deleteCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const cart = await CartModel.deleteOne({ customer: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    } else {
        return res.status(200).json({
            success: true,
            data: cart,
            message: `Cart deleted successfully`,
        });
    }
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
