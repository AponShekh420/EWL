import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getPrivateOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("the signle course work")
    const id = req.params?.id;
    if (!id) return next(createError(400, "Order ID is required"));

    const order = await OrderModel.findOne({_id: id, customer: req.user?._id}).populate([
      {
        path: "products._id", // populate product refs inside products array
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
