import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import { getFilterBodyData } from "../../../utils/getFilterBodyData";
import courseModel from "../../../models/CourseModel";

type MulterFile = Record<string, Express.Multer.File[]>;

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Course ID is required"));

    const { thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterBodyData(req);
    const deletedImages: string[] = body.deletedImages
      ? JSON.parse(body.deletedImages)
      : [];

    // Find old course
    const oldCourse = await courseModel.findById(id);
    if (!oldCourse) return next(createError(404, "Course not found"));

    let slug;
    // If the title hasn't changed, keep the current slug
    if (body.title === oldCourse.title && oldCourse?.slug == body.slug) {
      slug = oldCourse.slug;
    } else {
      // Remove special characters and generate slug
      const sanitizedTitle = body.metaTitle
        ? body.metaTitle
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
        : body.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "");

      slug = sanitizedTitle.split(" ").join("-");

      // Check for duplicates excluding the current communtiy ID
      const duplicateCommunityCount = await courseModel.countDocuments({
        slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        _id: { $ne: oldCourse._id },
      });

      if (duplicateCommunityCount > 0) {
        slug = `${slug}-${duplicateCommunityCount}`;
      }
    }

    const updatedData: Record<string, any> = { ...body, slug };

    // ---- THUMBNAIL ----
    if (thumbnail?.length) {
      updatedData.thumbnail = thumbnail[0].filename;
    }

    // ---- ATTACHMENT ----
    if (attachment?.length) {
      updatedData.attachment = attachment[0].filename;
    }

    // ---- UPDATE Course ----
    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCourse)
      return next(createError(400, "Failed to update course"));

    // ---- DELETE OLD FILES ----
    const allOldFiles = [
      oldCourse.thumbnail,
      oldCourse.attachment,
    ].filter(Boolean);

    deletedImages.forEach((img) => {
      if (allOldFiles.includes(img)) {
        deleteFileFromLocal(img, "courses");
      }
    });
    

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
