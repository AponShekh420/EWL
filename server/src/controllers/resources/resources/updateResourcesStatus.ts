import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ResourcesModel from "../../../models/ResourcesModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const updateResourcesStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const body = req.body;
    if (!id) return next(createError(400, "Resources ID is required"));
    // Find old blog
    const oldResources = await ResourcesModel.findById(id);
    if (!oldResources) return next(createError(404, "Resources not found"));

    const updatedData: Record<string, any> = { ...body };
    if (body.status) {
      updatedData.status = body.status;
    }

    // ---- UPDATE BLOG ----
    const updatedResources = await ResourcesModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedResources,
      message: "Resources status updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
