import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { CourseOrderModel } from "../../../models/CourseOrderModel";

export const getCourseOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Order ID is required"));

    const order = await CourseOrderModel.findById(id).populate([
      {
        path: "courses._id", // populate course refs inside courses array
      },
      {
        path: "customer",
        select: "-password"
      }
    ]);
    if (!order) {
      return next(createError(400, "Not found order"));
    }
    return res.status(200).json({
      success: true,
      data: order,
      message: "Order fetched by id successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
