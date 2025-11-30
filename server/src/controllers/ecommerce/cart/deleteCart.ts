import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CartModel } from "../../../models/CartModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Cart ID is required"));

    const deletedCart = await CartModel.findByIdAndDelete(id);
    if (!deletedCart) {
      return next(createError(404, `Cart with id ${id} not found`));
    }

    return res.status(200).json({
      success: true,
      data: deleteCart,
      message: `Order with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
