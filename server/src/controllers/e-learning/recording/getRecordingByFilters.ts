import { NextFunction, Request, Response } from "express";
import RecordingModel from "../../../models/RecordingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getRecordingByFilters = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = req.query;
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  let searchQuery: Record<string, any> = {};
  console.log("filter");
  if (query.search) {
    searchQuery = {
      $or: [{ name: { $regex: query.search, $options: "i" } }],
    };
  }
  try {
    const recordings = await RecordingModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await RecordingModel.countDocuments();
    res.status(200).json({
      success: true,
      data: recordings,
      message: "All recordings fetched successfully",
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};
