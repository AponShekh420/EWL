import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import UserModel from "../../models/UserModel";
import { catchErrorSend } from "../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "User ID is required"));

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return next(createError(404, `User with id ${id} not found`));
    }
    if(deletedUser?.avatar != "user.png") {
      deleteFileFromLocal(deletedUser?.avatar, "profile");
    }

    return res.status(200).json({
      success: true,
      data: deletedUser,
      message: `User with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
