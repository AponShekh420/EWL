import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { PaidSpeakerModel } from "../../models/PaidSpeaker";
import { catchErrorSend } from "../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const deletePaidSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Paid speaker ID is required"));

    const deletedSpeaker = await PaidSpeakerModel.findByIdAndDelete(id);
    if (!deletedSpeaker) {
      return next(createError(404, `Paid Speaker with id ${id} not found`));
    }
    deleteFileFromLocal(deletedSpeaker.avatar, "profile");
    return res.status(200).json({
      success: true,
      data: deletedSpeaker,
      message: `Paid speaker with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
