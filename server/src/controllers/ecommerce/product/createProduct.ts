import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { getImageUrl } from "../../../utils/getImageUrl";
import { getFilterBodyData } from "./../../../utils/getFilterBodyData";

type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { images, thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterBodyData(req);
    const newProduct = await productModel.create({
      ...body,
      thumbnail: getImageUrl(req, "products", thumbnail[0]),
      attachment: getImageUrl(req, "products", attachment[0]),
      images: images.map((file) => getImageUrl(req, "products", file)),
    });

    if (!newProduct) {
      return next(createError(400, "Failed to create product"));
    }

    res.status(201).json(newProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(createError(500, error.message));
    } else {
      next(createError(500, "server error"));
    }
  }
};
