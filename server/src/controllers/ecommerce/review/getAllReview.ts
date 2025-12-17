import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ReviewModel from "../../../models/ReviewModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query?.page) || 1;
  const limit = Number(req.query?.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const reviews = await ReviewModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate(["product", "customer"]);

    if (!reviews) {
      return next(createError(400, "Not found review"));
    }
    const total = await ReviewModel.countDocuments();
    res.status(200).json({
      success: true,
      data: reviews,
      message: "All review fetched successfully",
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
