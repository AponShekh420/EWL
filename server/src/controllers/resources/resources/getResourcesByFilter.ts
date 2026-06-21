import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ResourcesModel from "../../../models/ResourcesModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

export const getResourcesByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery: Record<string, any> = {};
    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 }; // default
    if (query.search) {
      searchQuery = {
        $or: [{ title: { $regex: query.search, $options: "i" } }],
      };
    }
    if (query.category) {
      searchQuery.category = query.category;
    }
    if (query.status) {
      searchQuery.status = query.status;
    }

    const resources = await ResourcesModel.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .sort(sortQuery);

    if (!resources) {
      return next(createError(400, "Not found Resources"));
    }
    const total = await ResourcesModel.countDocuments();
    res.status(200).json({
      success: true,
      data: resources,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All Resources fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
