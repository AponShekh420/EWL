import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Order ID is required"));

    const deletedOrder = await OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      return next(createError(404, `Order with id ${id} not found`));
    }

    return res.status(200).json({
      success: true,
      data: deletedOrder,
      message: `Order with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
