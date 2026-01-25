import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { getFilterBodyData } from "./../../../utils/getFilterBodyData";
import courseModel from "../../../models/CourseModel";

type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterBodyData(req);
    // Remove special characters and make the slug
    const sanitizedTitle = body.metaTitle
      ? body.metaTitle
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
      : body.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "");

    let slug = sanitizedTitle.split(" ").join("-");
    // Check for duplicates
    const duplicateCommunityCount = await courseModel.countDocuments({
      slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateCommunityCount > 0) {
      slug = `${slug}-${duplicateCommunityCount}`;
    }

    const createdCourse = await courseModel.create({
      ...body,
      slug,
      thumbnail: thumbnail[0].filename,
      attachment: attachment[0].filename,
    });

    if (!createdCourse) {
      return next(createError(400, "Failed to create course"));
    }
    
    return res.status(201).json({
      success: true,
      status: 201,
      data: createdCourse,
      message: "Course created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
