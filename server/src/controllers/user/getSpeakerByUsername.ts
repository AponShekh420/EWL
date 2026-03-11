import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import UserModel from "../../models/UserModel";
import { catchErrorSend } from "../../utils/catchErrorSend";

export const getSpeakerByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params?.username;
    if (!username) return next(createError(400, "Username is required"));

    const speaker = await UserModel.findOne({ userName: username, role: "speaker" }, "-passwordResetExpires -passwordResetToken -password -isOrthodoxJew -maritalStatus -keepsMitzvos -chafifaDuration -chickenSoupInDairySink");
    if (!speaker) {
      return next(createError(400, "Not found Speaker"));
    }
    return res.status(200).json({
      success: true,
      data: speaker,
      message: "Speaker fetched by username successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
