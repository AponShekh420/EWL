import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { CartModel } from "../../../models/CartModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;
    console.log(productId);
    const cart = await CartModel.findOne({ customer: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const initialLength = cart.items.length;
    const productObjectId = new Types.ObjectId(productId);

    const item = cart.items.find((item) =>
      item.product.equals(productObjectId),
    );
    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }
    cart.items.pull(item._id);
    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      data: deleteCart,
      message: `Cart deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
