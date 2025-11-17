import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ReviewModel from "../../../models/ReviewModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllReviewByProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.productId;
    const reviews = await ReviewModel.find({ product: id });
    if (!reviews) {
      return next(createError(400, "Not found review"));
    }
    res.status(200).json({
      success: true,
      data: reviews,
      message: "All review fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
