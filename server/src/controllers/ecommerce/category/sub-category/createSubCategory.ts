import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { SubCategoryModel } from "../../../../models/CategoryModel";
import { catchErrorSend } from "../../../../utils/catchErrorSend";
type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};
export const createSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, categoryId } = req.body;
  const file = req.file as Express.Multer.File;
  if (!name || !categoryId) {
    return next(createError(400, "Required fields are missing!"));
  }
  if (!file) {
    return next(createError(400, "subcategory thumbnail is missing!"));
  }

  try {
    const subCategory = await SubCategoryModel.create({
      name: name,
      slug: name.replace(" ", "-").toLowerCase(),
      description: description,
      thumbnail: file.filename,
      category: categoryId,
    });

    res.status(201).json({
      success: true,
      data: subCategory,
      message: "Subcategory created successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
