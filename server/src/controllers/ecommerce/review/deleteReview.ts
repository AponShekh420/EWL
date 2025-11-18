import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ReviewModel from "../../../models/ReviewModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Review ID is required"));

    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    if (!deletedReview) {
      return next(createError(404, `Review with id ${id} not found`));
    }

    return res.status(200).json({
      success: true,
      data: deleteReview,
      message: `Review with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
