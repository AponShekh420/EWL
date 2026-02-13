import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { PaidSpeakerModel } from "../../models/PaidSpeaker";
import { catchErrorSend } from "../../utils/catchErrorSend";

export const getAllFilterPaidSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = req.query;
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  let searchQuery: Record<string, any> = {};
  try {
    if (query.search) {
      searchQuery = {
        $or: [
          { firstName: { $regex: query.search, $options: "i" } },
          { lastName: { $regex: query.search, $options: "i" } },
        ],
      };
    }

    const paidSpeaker = await PaidSpeakerModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    if (!paidSpeaker) {
      return next(createError(400, "Not found paid speaker"));
    }
    const total = await PaidSpeakerModel.countDocuments();

    res.status(200).json({
      success: true,
      data: paidSpeaker,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All paid speaker fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
