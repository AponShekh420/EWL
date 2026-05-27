import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import blogModel from "../../../models/BlogModel";
import { BlogCategoryModel } from "../../../models/BlogCategoryModel";

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Blog ID is required"));

    const deletedBlog = await blogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return next(createError(404, `Blog with id ${id} not found`));
    }
    if (deletedBlog.thumbnail) {
      deleteFileFromLocal(
        [
          deletedBlog.thumbnail,
        ],
        "blogs",
      );
    } 

    await BlogCategoryModel.findOneAndUpdate(
      { _id: deletedBlog.category },
      { $pull: { blogs: deletedBlog._id } },
      { new: true }, // Optional: returns the updated document
    );
    return res.status(200).json({
      success: true,
      status: 201,
      data: deletedBlog,
      message: `Blog with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
