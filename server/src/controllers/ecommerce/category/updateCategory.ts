import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const file = req.file as Express.Multer.File;

  const updatedData: Record<string, any> = { ...body };
  if (body && body.name) {
    updatedData.name = body.name;
    updatedData.slug = body.name.replace(" ", "-").toLowerCase();
  }
  if (file) {
    updatedData.thumbnail = file.filename;
  }
  if (body && body.description) {
    updatedData.description = body.description;
  }
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Category ID is required"));

    // Fetch the old category to delete the previous image if replaced
    const oldCategory = await CategoryModel.findById(id);
    if (!oldCategory) return next(createError(404, "Category not found"));

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCategory)
      return next(createError(400, "Failed to update category"));

    if (body.deletedImage) {
      deleteFileFromLocal(body.deletedImage, "category");
    }

    return res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
