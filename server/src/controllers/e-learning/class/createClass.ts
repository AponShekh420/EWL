import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import UserModel from "../../../models/UserModel";
import { getFilterClassBodyData } from "../../../utils/getFilterClassBodyData";
import classModel from "../../../models/ClassModel";

type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {audiosOne, audiosTwo, videosOne, videosTwo, thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterClassBodyData(req);
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
    const duplicateCommunityCount = await classModel.countDocuments({
      slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateCommunityCount > 0) {
      slug = `${slug}-${duplicateCommunityCount}`;
    }

    const createdClass = await classModel.create({
      ...body,
      slug,
      thumbnail: thumbnail[0].filename,
      attachment: attachment ? attachment[0]?.filename : "",
      audiosOne: audiosOne ? audiosOne.map((file) => file.filename) : [],
      audiosTwo: audiosTwo ? audiosTwo.map((file) => file.filename) : [],
      videosOne: videosOne ? videosOne.map((file) => file.filename) : [],
      videosTwo: videosTwo ? videosTwo.map((file) => file.filename) : [],
    });

    if (!createdClass) {
      return next(createError(400, "Failed to create class"));
    }

    await UserModel.findOneAndUpdate(
      { _id: createdClass?.speaker },
      { $push: { classes: createdClass?._id } },
      { new: true } // Optional: returns the updated document
    );
    
    return res.status(201).json({
      success: true,
      status: 201,
      data: createdClass,
      message: "Class created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
