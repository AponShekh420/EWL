import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import ReviewModel from "../../../models/ReviewModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params?.id;
  const body = req.body;

  try {
    if (!id) return next(createError(400, "Review ID is required"));
    // Find old order
    const oldReview = await ReviewModel.findById(id);
    if (!oldReview) return next(createError(404, "Review not found"));

    const updatedData: Record<string, any> = { ...body };

    // ---- UPDATE Cart ----
    const updatedReview = await ReviewModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    //if status approved then store in product model
    if (body.status === "approved") {
      await productModel.findByIdAndUpdate(oldReview.product, {
        $push: { reviews: id },
      });
    } else {
      await productModel.findByIdAndUpdate(oldReview.product, {
        $pull: { reviews: id },
      });
    }

    if (!updatedReview)
      return next(createError(400, "Failed to update review"));

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedReview,
      message: "Review updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
