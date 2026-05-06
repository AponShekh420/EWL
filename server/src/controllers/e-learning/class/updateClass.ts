import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import UserModel from "../../../models/UserModel";
import { getFilterClassBodyData } from "../../../utils/getFilterClassBodyData";
import classModel from "../../../models/ClassModel";

type MulterFile = Record<string, Express.Multer.File[]>;

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Class ID is required"));

    const { audiosOne, audiosTwo, videosOne, videosTwo, thumbnail, attachment } = req.files as MulterFile;
    
    const body = getFilterClassBodyData(req);
    const deletedImages: string[] = body.deletedImages
      ? JSON.parse(body.deletedImages)
      : [];

    const deletedAudiosOne: string[] = body.deletedAudiosOne
      ? JSON.parse(body.deletedAudiosOne)
      : [];
    
    const deletedAudiosTwo: string[] = body.deletedAudiosTwo
      ? JSON.parse(body.deletedAudiosTwo)
      : [];
    const deletedVideosOne: string[] = body.deletedVideosOne
      ? JSON.parse(body.deletedVideosOne)
      : [];
    const deletedVideosTwo: string[] = body.deletedVideosTwo
      ? JSON.parse(body.deletedVideosTwo)
      : [];

    // Find old class
    const oldClass = await classModel.findById(id);
    if (!oldClass) return next(createError(404, "Class not found"));

    let slug;
    // If the title hasn't changed, keep the current slug
    if (body.title === oldClass.title && oldClass?.slug == body.slug) {
      slug = oldClass.slug;
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
      const duplicateCommunityCount = await classModel.countDocuments({
        slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        _id: { $ne: oldClass._id },
      });

      if (duplicateCommunityCount > 0) {
        slug = `${slug}-${duplicateCommunityCount}`;
      }
    }

    const updatedData: Record<string, any> = { ...body, slug };

    // ---- AUDIOS ONE ----
    if (audiosOne?.length || deletedAudiosOne.length) {
      const newAudiosOne = audiosOne?.map((file) => file.filename) || [];

      updatedData.audiosOne = [
        ...oldClass.audiosOne.filter((audio) => !deletedAudiosOne.includes(audio)),
        ...newAudiosOne,
      ];
    }

    // ---- AUDIOS TWO ----
    if (audiosTwo?.length || deletedAudiosTwo.length) {
      const newAudiosTwo = audiosTwo?.map((file) => file.filename) || [];

      updatedData.audiosTwo = [
        ...oldClass.audiosTwo.filter((audio) => !deletedAudiosTwo.includes(audio)),
        ...newAudiosTwo,
      ];
    }

    // ---- VIDEOS ONE ----
    if (videosOne?.length || deletedVideosOne.length) {
      const newVideosOne = videosOne?.map((file) => file.filename) || [];


      updatedData.videosOne = [
        ...oldClass.videosOne.filter((video) => !deletedVideosOne.includes(video)),
        ...newVideosOne,
      ];
    }

    // ---- VIDEOS TWO ----
    if (videosTwo?.length || deletedVideosTwo.length) {
      const newVideosTwo = videosTwo?.map((file) => file.filename) || [];

      updatedData.videosTwo = [
        ...oldClass.videosTwo.filter((video) => !deletedVideosTwo.includes(video)),
        ...newVideosTwo,
      ];
    }

    // ---- THUMBNAIL ----
    if (thumbnail?.length) {
      updatedData.thumbnail = thumbnail[0].filename;
    }

    // ---- ATTACHMENT ----
    if (attachment?.length) {
      updatedData.attachment = attachment[0].filename;
    }
    
    // ---- UPDATE Class ----
    const updatedClass = await classModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedClass)
      return next(createError(400, "Failed to update class"));


    // ---- DELETE OLD FILES ----
    const allOldFiles = [
      ...(oldClass.audiosOne || []),
      ...(oldClass.audiosTwo || []),
      ...(oldClass.videosOne || []),
      ...(oldClass.videosTwo || []),
      oldClass.thumbnail,
      oldClass.attachment,
    ].filter(Boolean);

    deletedImages.forEach((img) => {
      if (allOldFiles.includes(img)) {
        deleteFileFromLocal(img, "classes");
      }
    });
    deletedAudiosOne.forEach((audio) => {
      if (allOldFiles.includes(audio)) {
        deleteFileFromLocal(audio, "classes");
      }
    });
    deletedAudiosTwo.forEach((audio) => {
      if (allOldFiles.includes(audio)) {
        deleteFileFromLocal(audio, "classes");
      }
    });
    deletedVideosOne.forEach((video) => {
      if (allOldFiles.includes(video)) {
        deleteFileFromLocal(video, "classes");
      }
    });
    deletedVideosTwo.forEach((video) => {
      if (allOldFiles.includes(video)) {
        deleteFileFromLocal(video, "classes");
      }
    });
    if (body.speaker !== oldClass.speaker) {
      await UserModel.updateOne(
        { classes: {$in: [oldClass._id]} },
        { $pull: { classes: oldClass._id } }
      );
      await UserModel.updateOne(
        { _id: body.speaker },
        { $push: { classes: oldClass._id } }
      );
    }

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedClass,
      message: "Class updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
