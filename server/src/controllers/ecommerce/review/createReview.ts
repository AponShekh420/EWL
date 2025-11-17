import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ReviewModel from "../../../models/ReviewModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const createdReview = await ReviewModel.create({
      ...body,
    });

    if (!createdReview) {
      return next(createError(400, "Failed to add review"));
    }

    return res.status(201).json({
      success: true,
      data: createdReview,
      message: "Review created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
