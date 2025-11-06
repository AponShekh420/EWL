import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Product ID is required"));

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

    return res.status(200).json({
      success: true,
      status: 201,
      data: deletedProduct,
      message: `Product with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
