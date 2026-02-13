import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CartModel } from "../../../models/CartModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req?.user?._id;

    if (quantity < 1) {
      return next(createError(400, "Quantity must be at least 1"));
    }

    const cart = await CartModel.findOne({ customer: userId });
    if (!cart) {
      return next(createError(404, "Cart not found"));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex === -1) {
      return next(createError(404, "Product not in cart"));
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    return res.status(200).json({
      success: true,
      data: cart,
      message: "Cart updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
