import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ResourcesModel from "../../../models/ResourcesModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getAllResources = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resources = await ResourcesModel.find();
    if (!resources) {
      return next(createError(400, "Not found resources"));
    }
    res.status(200).json({
      success: true,
      data: resources,
      message: "All resources fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
