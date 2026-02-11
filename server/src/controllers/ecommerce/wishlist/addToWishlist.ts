import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { WishlistModel } from "../../../models/WishlistModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
export const addToWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.body;
    const userId = req?.user?._id;

    const product = await productModel.findById(productId);
    if (!product) {
      return next(createError(400, "Product not found"));
    }

    let wishlist = await WishlistModel.findOne({ customer: userId });

    if (!wishlist) {
      wishlist = new WishlistModel({
        customer: userId,
        items: [productId],
      });
    } else {
      const itemIndex = wishlist.items.findIndex(
        (item) => item.toString() === productId,
      );
      if (itemIndex < 0) {
        wishlist.items.push(productId);
      }
    }
    await wishlist.save();

    return res.status(201).json({
      success: true,
      data: wishlist,
      message: "Product added to wishlist",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
