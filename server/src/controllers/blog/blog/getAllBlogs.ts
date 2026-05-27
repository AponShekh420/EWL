import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import blogModel from "../../../models/BlogModel";

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await blogModel.find();
    if (!blogs) {
      return next(createError(400, "Not found blogs"));
    }
    res.status(200).json({
      success: true,
      data: blogs,
      message: "All Blogs fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
