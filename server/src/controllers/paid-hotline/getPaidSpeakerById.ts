import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { PaidSpeakerModel } from "../../models/PaidSpeaker";
import { catchErrorSend } from "../../utils/catchErrorSend";

export const getPaidSpeakerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Paid Speaker ID is required"));

    const paidSpeaker = await PaidSpeakerModel.findById(id);
    if (!paidSpeaker) {
      return next(createError(400, "Not found user"));
    }
    return res.status(200).json({
      success: true,
      data: paidSpeaker,
      message: "Paid speaker fetched by id successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
