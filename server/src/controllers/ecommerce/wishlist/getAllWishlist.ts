import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { WishlistModel } from "../../../models/WishlistModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const wishlist = await WishlistModel.findOne({ customer: userId }).populate(
      "items",
    );
    if (!wishlist) {
      return next(createError(400, "Not found carts"));
    }
    res.status(200).json({
      success: true,
      data: wishlist,
      message: "All wishlist fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
