import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ResourceCategoryModel } from "../../../models/ResourceCategory";
import ResourcesModel from "../../../models/ResourcesModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { getFilterBlogBodyData } from "../../../utils/getFilterBlogBodyDatacopy";

type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};

export const createResources = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { thumbnail } = req.files as MulterFile;
    const body = getFilterBlogBodyData(req);
    // Remove special characters and make the slug
    const sanitizedTitle = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "");

    let slug = sanitizedTitle.split(" ").join("-");
    // Check for duplicates
    const duplicateBlogSlugCount = await ResourcesModel.countDocuments({
      slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateBlogSlugCount > 0) {
      slug = `${slug}-${duplicateBlogSlugCount}`;
    }

    const createdResources = await ResourcesModel.create({
      ...body,
      slug,
      thumbnail: thumbnail[0].filename,
    });

    if (!createdResources) {
      return next(createError(400, "Failed to create Resources"));
    }
    await ResourceCategoryModel.findOneAndUpdate(
      { slug: { $regex: `^${createdResources.category}$`, $options: "i" } },
      { $push: { resources: createdResources._id } },
      { new: true }, // Optional: returns the updated document
    );
    return res.status(201).json({
      success: true,
      status: 201,
      data: createdResources,
      message: "Resources created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
