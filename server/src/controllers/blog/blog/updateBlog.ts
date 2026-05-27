import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import { getFilterBodyData } from "../../../utils/getFilterBodyData";
import BlogModel from "../../../models/BlogModel";
import { BlogCategoryModel } from "../../../models/BlogCategoryModel";

type MulterFile = Record<string, Express.Multer.File[]>;

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Blog ID is required"));

    const { images, thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterBodyData(req);
    const deletedImages: string[] = body.deletedImages
      ? JSON.parse(body.deletedImages)
      : [];

    // Find old blog
    const oldBlog = await BlogModel.findById(id);
    if (!oldBlog) return next(createError(404, "Blog not found"));

    let slug;
    let metaSlug;
    // If the title hasn't changed, keep the current slug
    if (body.title === oldBlog.title && oldBlog?.slug == body.slug) {
      slug = oldBlog.slug;
    } else {
      // Remove special characters and generate slug
      const sanitizedTitle = body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "");

      slug = sanitizedTitle.split(" ").join("-");

      // Check for duplicates excluding the current communtiy ID
      const duplicateBlogCount = await BlogModel.countDocuments({
        slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        _id: { $ne: oldBlog._id },
      });

      if (duplicateBlogCount > 0) {
        slug = `${slug}-${duplicateBlogCount}`;
      }
    }
    // If the title hasn't changed, keep the current metaSlug

    if (
      body.metaTitle === oldBlog.metaTitle &&
      oldBlog?.metaSlug == body.metaSlug
    ) {
      metaSlug = oldBlog.metaSlug;
      console.log(body.metaTitle, "old");
    } else {
      console.log(body.metaTitle);
      // Remove special characters and generate slug
      const sanitizedTitle = body.metaTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "");

      metaSlug = sanitizedTitle.split(" ").join("-");

      // Check for duplicates excluding the current communtiy ID
      const duplicateBlogCount = await BlogModel.countDocuments({
        metaSlug: { $regex: `^${metaSlug}(-[0-9]*)?$`, $options: "i" },
        _id: { $ne: oldBlog._id },
      });

      if (duplicateBlogCount > 0) {
        metaSlug = `${metaSlug}-${duplicateBlogCount}`;
      }
    }

    const updatedData: Record<string, any> = { ...body, slug, metaSlug };

    // ---- THUMBNAIL ----
    if (thumbnail?.length) {
      updatedData.thumbnail = thumbnail[0].filename;
    }


    // ---- UPDATE BLOG ----
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedBlog)
      return next(createError(400, "Failed to update blog"));

    // ---- DELETE OLD FILES ----
    const allOldFiles = [
      oldBlog.thumbnail,
    ].filter(Boolean);

    deletedImages.forEach((img) => {
      if (allOldFiles.includes(img)) {
        deleteFileFromLocal(img, "blogs");
      }
    });
    console.log("body category:", body.category)
    console.log("oldBlog category:", oldBlog.category)
    if (body.category !== oldBlog.category) {
      await BlogCategoryModel.updateOne(
        { blogs: { $in: [oldBlog._id] } },   // find category that HAS this blog
        { $pull: { blogs: oldBlog._id } }     // remove from OLD category
      );
      await BlogCategoryModel.updateOne(
        { slug: { $regex: `^${body.category}$`, $options: "i" } },
        { $push: { blogs: oldBlog._id } },
      );
    }

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
