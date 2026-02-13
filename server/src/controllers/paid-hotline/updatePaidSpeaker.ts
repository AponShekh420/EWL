import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { PaidSpeakerModel } from "../../models/PaidSpeaker";
import { catchErrorSend } from "../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";
export const updatePaidSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params?.id;
  const body = req.body;
  const file = req.file;

  try {
    if (!id) return next(createError(400, "Paid Speaker ID is required"));

    // Find old user
    const oldUser = await PaidSpeakerModel.findById(id);
    if (!oldUser) return next(createError(404, "Paid speaker not found"));

    const updatedData: Record<string, any> = { ...body };

    if (file) {
      updatedData.avatar = file.filename;
    }

    // ---- UPDATE USER ----
    const updatedUser = await PaidSpeakerModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser)
      return next(createError(400, "Failed to update paid speaker"));

    if (file && oldUser.avatar) {
      deleteFileFromLocal(oldUser.avatar, "profile");
    }
    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Paid speaker updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
