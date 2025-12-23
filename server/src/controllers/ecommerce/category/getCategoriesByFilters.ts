import { NextFunction, Request, Response } from "express";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { CategoryModel } from "./../../../models/CategoryModel";

export const getCategoriesByFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  let searchQuery: Record<string, any> = {};

  if (query.search) {
    searchQuery = {
      $or: [{ name: { $regex: query.search, $options: "i" } }],
    };
  }
  try {
    const categories = await CategoryModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await CategoryModel.countDocuments();
    res.status(200).json({
      success: true,
      data: categories,
      message: "All category fetched successfully",
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
