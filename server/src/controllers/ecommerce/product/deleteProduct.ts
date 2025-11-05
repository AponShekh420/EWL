import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(createError(404, `Product with id ${id} not found`));
    }
    deleteFileFromLocal(
      [
        ...deletedProduct.images,
        deletedProduct.thumbnail,
        deletedProduct.attachment,
      ],
      "/images/products"
    );
    res
      .status(201)
      .json({ message: `Product with id ${id} deleted successfully` });
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(createError(500, error.message));
    } else {
      next(createError(500, "server error"));
    }
  }
};
