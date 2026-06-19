import { NextFunction, Request, Response } from "express";
import { ResourceCategoryModel } from "../../../models/ResourceCategory";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getResourceCategoriesByFilters = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    const categories = await ResourceCategoryModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await ResourceCategoryModel.countDocuments();
    res.status(200).json({
      success: true,
      data: categories,
      message: "All Resources categories fetched successfully",
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
