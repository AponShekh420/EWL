import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import RecordingModel from "../../../models/RecordingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getRecordingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Recording id is required"));

    const recording = await RecordingModel.findById(id);
    if (!recording) {
      return next(createError(400, "Not found Recording"));
    }
    return res.status(200).json({
      success: true,
      data: recording,
      message: "Recording fetched by id successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
