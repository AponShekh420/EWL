import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import UserModel from "../../models/UserModel";
import { catchErrorSend } from "../../utils/catchErrorSend";

export const getAllSpeakers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  // const page = Number(query?.page) || 1;
  // const limit = Number(query?.limit) || 10;
  // const skip = (page - 1) * limit;
  try {
    const searchQuery: Record<string, any> = {
        role: "speaker",
    };

    if (query.search) {
        searchQuery.$or = [
            { firstName: { $regex: query.search, $options: "i" } },
            { lastName: { $regex: query.search, $options: "i" } },
        ];
    }

    const users = await UserModel.find(searchQuery, { password: 0, isOrthodoxJew: 0, maritalStatus: 0, keepsMitzvos: 0, chafifaDuration: 0, chickenSoupInDairySink: 0 })
      .sort({ createdAt: -1 })
      .exec();

    if (!users) {
      return next(createError(400, "Not found users"));
    }
    const total = users?.length;

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        // page: page,
        // limit: limit,
        total: total,
        // totalPages: Math.ceil(total / limit),
      },
      message: "All Speakers fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
