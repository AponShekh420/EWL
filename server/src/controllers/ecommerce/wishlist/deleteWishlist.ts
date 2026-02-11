import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { WishlistModel } from "../../../models/WishlistModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const deleteWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;

    const wishlist = await WishlistModel.findOne({ customer: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    const initialLength = wishlist.items.length;
    const productObjectId = new Types.ObjectId(productId);

    const itemExists = wishlist.items.some((item) =>
      item.equals(productObjectId),
    );

    if (!itemExists) {
      return res.status(404).json({ message: "Product not in wishlist" });
    }
    wishlist.items = wishlist.items.filter(
      (item) => !item.equals(productObjectId),
    );

    if (wishlist.items.length === initialLength) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    await wishlist.save();

    return res.status(200).json({
      success: true,
      data: wishlist,
      message: `Wishlist deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
