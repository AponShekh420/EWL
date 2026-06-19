import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ResourceCategoryModel } from "../../../models/ResourceCategory";
import ResourcesModel from "../../../models/ResourcesModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import { getFilterBodyData } from "../../../utils/getFilterBodyData";

type MulterFile = Record<string, Express.Multer.File[]>;

export const updateResources = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Resources ID is required"));

    const { thumbnail } = req.files as MulterFile;
    const body = getFilterBodyData(req);

    const deletedImages: string[] = body.deletedImages
      ? JSON.parse(body.deletedImages)
      : [];

    // Find old blog
    const oldResources = await ResourcesModel.findById(id);
    if (!oldResources) return next(createError(404, "Resources not found"));

    let slug;
    // If the title hasn't changed, keep the current slug
    if (body.title === oldResources.title && oldResources?.slug == body.slug) {
      slug = oldResources.slug;
    } else {
      // Remove special characters and generate slug
      const sanitizedTitle = body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "");

      slug = sanitizedTitle.split(" ").join("-");

      // Check for duplicates excluding the current communtiy ID
      const duplicateResourcesCount = await ResourcesModel.countDocuments({
        slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        _id: { $ne: oldResources._id },
      });

      if (duplicateResourcesCount > 0) {
        slug = `${slug}-${duplicateResourcesCount}`;
      }
    }

    const updatedData: Record<string, any> = { ...body, slug };

    // ---- THUMBNAIL ----
    if (thumbnail?.length) {
      updatedData.thumbnail = thumbnail[0].filename;
    }

    // ---- UPDATE BLOG ----
    const updatedResources = await ResourcesModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedResources)
      return next(createError(400, "Failed to update Resources"));

    // ---- DELETE OLD FILES ----
    const allOldFiles = [oldResources.thumbnail].filter(Boolean);

    deletedImages.forEach((img) => {
      if (allOldFiles.includes(img)) {
        deleteFileFromLocal(img, "resources");
      }
    });
    console.log("body category:", body.category);
    console.log("oldResources category:", oldResources.category);
    if (body.category !== oldResources.category) {
      await ResourceCategoryModel.updateOne(
        { resources: { $in: [oldResources._id] } }, // find category that HAS this blog
        { $pull: { blogs: oldResources._id } }, // remove from OLD category
      );
      await ResourceCategoryModel.updateOne(
        { slug: { $regex: `^${body.category}$`, $options: "i" } },
        { $push: { resources: oldResources._id } },
      );
    }

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedResources,
      message: "Resources updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
