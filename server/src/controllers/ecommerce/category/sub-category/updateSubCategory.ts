import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { SubCategoryModel } from "../../../../models/CategoryModel";
import { catchErrorSend } from "../../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../../utils/deleteFileFromLocal";
import { getImageUrl } from "../../../../utils/getImageUrl";

export const updateSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const file = req.file as Express.Multer.File;
  const updatedData: Record<string, any> = { ...body };

  if (body && body.categoryId) {
    updatedData.category = body.categoryId;
  }
  if (body && body.name) {
    updatedData.name = body.name;
    updatedData.slug = body.name.replace(" ", "-").toLowerCase();
  }
  if (body && body.description) {
    updatedData.description = body.description;
  }
  if (file) {
    updatedData.thumbnail = getImageUrl(req, "category", file);
  }

  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Subcategory ID is required"));

    // Fetch the old category to delete the previous image if replaced
    const oldSubcategory = await SubCategoryModel.findById(id);

    if (!oldSubcategory) return next(createError(404, "Subcategory not found"));

    const updatedSubcategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedSubcategory)
      return next(createError(400, "Failed to update subcategory"));

    if (body.deletedImage) {
      deleteFileFromLocal(body.deletedImage, "category");
    }

    return res.status(200).json({
      success: true,
      data: updatedSubcategory,
      message: "Subcategory updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
