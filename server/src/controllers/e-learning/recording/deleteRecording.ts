import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import RecordingModel from "../../../models/RecordingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";

export const deleteRecording = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Recording ID is required"));

    const deletedRecording = await RecordingModel.findByIdAndDelete(id);
    if (!deletedRecording) {
      return next(createError(404, `Recording with id ${id} not found`));
    }

    const images = deletedRecording.recordings
      .map((recording) => recording.file)
      .filter((file): file is string => Boolean(file));

    deleteFileFromLocal(images, "recording");

    return res.status(200).json({
      success: true,
      status: 201,
      data: deletedRecording,
      message: `Product with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
