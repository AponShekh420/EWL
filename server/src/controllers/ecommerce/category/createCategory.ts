import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { getImageUrl } from "../../../utils/getImageUrl";
type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const file = req.file as Express.Multer.File;
  if (!name) {
    return next(createError(400, "Required fields are missing!"));
  }
  if (!file) {
    return next(createError(400, "Category image is missing!"));
  }
  const category = await CategoryModel.create({
    name: name,
    slug: name.replace(" ", "-").toLowerCase(),
    image: getImageUrl(req, "category", file),
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
