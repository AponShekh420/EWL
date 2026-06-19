import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ResourcesModel from "../../../models/ResourcesModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getResourcesBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const slug = req.params?.slug;
    if (!slug) return next(createError(400, "Resources slug is required"));

    const resources = await ResourcesModel.findOne({ slug }).populate(
      "creator",
      "firstName lastName userName email avatar",
    );
    if (!resources) {
      return next(createError(400, "Not found resources"));
    }
    return res.status(200).json({
      success: true,
      data: resources,
      message: "Resources fetched by slug successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
