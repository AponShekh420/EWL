import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
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
    const createdProduct = await productModel.create({
      ...body,
      thumbnail: getImageUrl(req, "products", thumbnail[0]),
      attachment: getImageUrl(req, "products", attachment[0]),
      images: images.map((file) => getImageUrl(req, "products", file)),
    });

    if (!createdProduct) {
      return next(createError(400, "Failed to create product"));
    }

    return res.status(201).json({
      success: true,
      status: 201,
      data: createdProduct,
      message: "Product created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
