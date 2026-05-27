import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import BlogModel from "../../../models/BlogModel";

export const updateBlogStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    const body = req.body;
    if (!id) return next(createError(400, "Blog ID is required"));
    // Find old blog
    const oldBlog = await BlogModel.findById(id);
    if (!oldBlog) return next(createError(404, "Blog not found"));

    const updatedData: Record<string, any> = { ...body };
    if (body.status) {
      updatedData.status = body.status;
    }

    // ---- UPDATE BLOG ----
    const updatedBlog = await BlogModel.findByIdAndUpdate(
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
      data: updatedBlog,
      message: "Blog status updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
