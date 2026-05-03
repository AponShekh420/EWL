import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { ClassOrderModel } from "../../../models/ClassOrderModel";

export const getPrivateClassOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Order ID is required"));

    const order = await ClassOrderModel.findOne({_id: id, customer: req.user?._id}).populate([
      {
        path: "classes._id", // populate class refs inside classes array
      },
      {
        path: "customer",
        select: "-password"
      }
    ]);
    if (!order) {
      return res.status(200).json({
      success: false,
      data: {},
      message: "Order Not Found",
    });
      
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
