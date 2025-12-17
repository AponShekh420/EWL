import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

type MulterFile = Record<string, Express.Multer.File[]>;

export const updateProductStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Product ID is required"));
    // Find old product
    const oldProduct = await productModel.findById(id);
    if (!oldProduct) return next(createError(404, "Product not found"));
    const { status } = req.body;
    if (!status) return next(createError(400, "Status is required"));
    const updatedData: Record<string, any> = { ...req.body };

    // ---- UPDATE PRODUCT ----
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product status updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
