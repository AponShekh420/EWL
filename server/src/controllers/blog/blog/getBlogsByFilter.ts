import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import BlogModel from "../../../models/BlogModel";

export const getBlogsByFilter = async (
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
    if (query.tag) {
      searchQuery.tags = { $in: [query.tag] };
    }
    if (query.tag) {
      searchQuery.tags = { $in: [query.tag] };
    }
    
    // // console.log("objectserch", searchQuery)
    // // console.log("query", query)
    // if (query.sort) {
    //   if (query.sort === "popularity") {
    //     sortQuery = { sold: -1 };
    //   } else if (query.sort === "average-rating") {
    //     sortQuery = { averageRating: -1 };
    //   } else if (query.sort === "price-low-to-high") {
    //     sortQuery = { salePrice: 1 };
    //   } else if (query.sort === "price-high-to-low") {
    //     sortQuery = { salePrice: -1 };
    //   }
    // }

    const blogs = await BlogModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortQuery);

    if (!blogs) {
      return next(createError(400, "Not found blogs"));
    }
    const blog = await BlogModel.findOne().sort({ createdAt: -1 });
    const total = await BlogModel.countDocuments();
    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All Blogs fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
