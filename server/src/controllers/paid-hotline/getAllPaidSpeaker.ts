import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { PaidSpeakerModel } from "../../models/PaidSpeaker";
import { catchErrorSend } from "../../utils/catchErrorSend";

export const getAllPaidSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const paidSpeaker = await PaidSpeakerModel.find()
      .sort({ createdAt: -1 })
      .exec();

    if (!paidSpeaker) {
      return next(createError(400, "Not found paid speaker"));
    }
    res.status(200).json({
      success: true,
      data: paidSpeaker,

      message: "All paid speaker fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
