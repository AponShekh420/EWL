import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { BlogCategoryModel } from "../../../models/BlogCategoryModel";
type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};
export const createBlogCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description } = req.body;
  const file = req.file as Express.Multer.File;
  if (!file) {
    return next(createError(400, "Category thumbnail is missing!"));
  }
  const slug = name.replace(" ", "-").toLowerCase();
  const existingCategory = await BlogCategoryModel.findOne({ slug: slug });
  if (existingCategory) {
    return next(createError(409, "Category with this name already exists!"));
  }
  const category = await BlogCategoryModel.create({
    name: name,
    description: description,
    slug: slug,
    thumbnail: file.filename,
  });

  try {
    res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
