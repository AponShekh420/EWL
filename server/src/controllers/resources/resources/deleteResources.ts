import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ResourceCategoryModel } from "../../../models/ResourceCategory";
import ResourcesModel from "../../../models/ResourcesModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";

export const deleteResources = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Resources ID is required"));

    const deletedResources = await ResourcesModel.findByIdAndDelete(id);
    if (!deletedResources) {
      return next(createError(404, `Resources with id ${id} not found`));
    }
    if (deletedResources.thumbnail) {
      deleteFileFromLocal([deletedResources.thumbnail], "resources");
    }

    await ResourceCategoryModel.findOneAndUpdate(
      { name: deletedResources.category },
      { $pull: { resources: deletedResources._id } },
      { new: true }, // Optional: returns the updated document
    );
    return res.status(200).json({
      success: true,
      status: 201,
      data: deletedResources,
      message: `Resources with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
