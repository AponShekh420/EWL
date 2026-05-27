import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import blogModel from "../../../models/BlogModel";
import { BlogCategoryModel } from "../../../models/BlogCategoryModel";
import { getFilterBlogBodyData } from "../../../utils/getFilterBlogBodyDatacopy";

type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Creating blog with data:", req.body);
    const {thumbnail } = req.files as MulterFile;
    const body = getFilterBlogBodyData(req);
    // Remove special characters and make the slug
    const sanitizedTitle = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "");

    const sanitizedMetaTitle = body.metaTitle
      ? body.metaTitle
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
      : body.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "");

    let metaSlug = sanitizedMetaTitle.split(" ").join("-");
    let slug = sanitizedTitle.split(" ").join("-");
    // Check for duplicates
    const duplicateBlogSlugCount = await blogModel.countDocuments({
      slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateBlogSlugCount > 0) {
      slug = `${slug}-${duplicateBlogSlugCount}`;
    }

    const duplicateBlogMetaSlugCount = await blogModel.countDocuments({
      metaSlug: { $regex: `^${metaSlug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateBlogMetaSlugCount > 0) {
      metaSlug = `${metaSlug}-${duplicateBlogMetaSlugCount}`;
    }

    const createdBlog = await blogModel.create({
      ...body,
      slug,
      metaSlug,
      thumbnail: thumbnail[0].filename,
    });

    if (!createdBlog) {
      return next(createError(400, "Failed to create blog"));
    }
    await BlogCategoryModel.findOneAndUpdate(
      { slug: { $regex: `^${createdBlog.category}$`, $options: "i" } },
      { $push: { blogs: createdBlog._id } },
      { new: true }, // Optional: returns the updated document
    );
    return res.status(201).json({
      success: true,
      status: 201,
      data: createdBlog,
      message: "Blog created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
