import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import classModel from "../../../models/ClassModel";

export const updateClassStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    const body = req.body;
    if (!id) return next(createError(400, "Class ID is required"));
    // Find old class
    const oldClass = await classModel.findById(id);
    if (!oldClass) return next(createError(404, "Class not found"));

    const updatedData: Record<string, any> = { ...body };
    if (body.status) {
      updatedData.status = body.status;
    }

    // ---- UPDATE CLASS ----
    const updatedClass = await classModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedClass,
      message: "Class status updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
