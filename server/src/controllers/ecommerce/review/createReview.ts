import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import ReviewModel from "../../../models/ReviewModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { review, rating, productId } = req.body;
    const userId = req.user?._id;

    const createdReview = await ReviewModel.create({
      review,
      rating,
      product: productId,
      customer: userId,
    });

    if (!createdReview) {
      return next(createError(400, "Failed to add review"));
    }

    await productModel.findByIdAndUpdate(productId, {
      $push: { reviews: createdReview._id },
    });

    return res.status(201).json({
      success: true,
      data: createdReview,
      message: "Review created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
