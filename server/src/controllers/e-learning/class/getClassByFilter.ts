import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import classModel from "../../../models/ClassModel";

export const getClassByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery: Record<string, any> = {};

    query.category && (searchQuery.category = query.category);
    query.speaker && (searchQuery.speaker = query.speaker);
    query.status && (searchQuery.status = query.status);

    if (query.search) {
        searchQuery.$or = [
          { title: { $regex: query.search, $options: "i" } },
        ];
    }

    const classes = await classModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("speaker", "-passwordResetExpires -passwordResetToken -password -isOrthodoxJew -maritalStatus -keepsMitzvos -chafifaDuration -chickenSoupInDairySink");

    if (!classes) {
      return next(createError(400, "Not found classes"));
    }

    const total = classes.length;
    res.status(200).json({
      success: true,
      data: classes,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All Classes fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
