import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { PaidSpeakerModel } from "../../models/PaidSpeaker";
import { catchErrorSend } from "../../utils/catchErrorSend";
export const createPaidSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const file = req.file;
    if (!file) {
      return next(createError(400, "Avatar is required"));
    }
    const createdSpeaker = await PaidSpeakerModel.create({
      ...body,
      avatar: file?.filename,
    });

    if (!createdSpeaker) {
      return next(createError(400, "Failed to create paid speaker"));
    }

    return res.status(201).json({
      success: true,
      data: createdSpeaker,
      message: "Paid speaker created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
