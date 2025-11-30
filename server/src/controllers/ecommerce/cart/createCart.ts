import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CartModel } from "../../../models/CartModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const createdCart = await CartModel.create({
      ...body,
    });

    if (!createdCart) {
      return next(createError(400, "Failed to add cart"));
    }

    return res.status(201).json({
      success: true,
      data: createdCart,
      message: "Cart created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
