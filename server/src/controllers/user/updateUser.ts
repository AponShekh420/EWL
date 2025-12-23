import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import UserModel from "../../models/UserModel";
import { catchErrorSend } from "../../utils/catchErrorSend";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params?.id;
  const body = req.body;
  try {
    if (!id) return next(createError(400, "Order ID is required"));

    // Find old user
    const oldUser = await UserModel.findById(id);
    if (!oldUser) return next(createError(404, "User not found"));

    const updatedData: Record<string, any> = { ...body };
    if (body.role) {
      updatedData.role = body.role;
    }
    // ---- UPDATE USER ----
    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return next(createError(400, "Failed to update user"));
    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
