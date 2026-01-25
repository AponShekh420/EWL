import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import courseModel from "../../../models/CourseModel";

export const getCourseByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery: Record<string, any> = {};

    if (query.search) {
      searchQuery = {
        $or: [{ title: { $regex: query.search, $options: "i" } }],
      };
    }
    const courses = await courseModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("reviews");

    if (!courses) {
      return next(createError(400, "Not found courses"));
    }

    const total = await courseModel.countDocuments();
    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All Courses fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
