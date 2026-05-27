import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import BlogModel from "../../../models/BlogModel";

export const getBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Blog slug is required"));

    const blog = await BlogModel.findOne({ slug }).populate("creator", "firstName lastName userName email avatar");
    if (!blog) {
      return next(createError(400, "Not found blog"));
    }
    return res.status(200).json({
      success: true,
      data: blog,
      message: "Blog fetched by slug successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
