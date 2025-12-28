import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import UserModel from "../../models/UserModel";
import { catchErrorSend } from "../../utils/catchErrorSend";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    const users = await UserModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    if (!users) {
      return next(createError(400, "Not found users"));
    }
    const total = await UserModel.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All users fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
