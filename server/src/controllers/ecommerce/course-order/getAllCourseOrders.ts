import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import courseModel from "../../../models/CourseModel";
import { CourseOrderModel } from "../../../models/CourseOrderModel";

export const getAllCourseOrder = async (
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
      const courses = await courseModel
        .find({
          title: { $regex: query.search, $options: "i" },
        })
        .select("_id");
      if (courses.length > 0) {
        searchQuery = { course: { $in: courses.map((p) => p._id) } };
      }
    }

    const orders = await CourseOrderModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "courses._id", // populate course refs inside courses array
        },
        {
          path: "customer",
          select: "-password"
        }
      ]);
    if (!orders) {
      return next(createError(400, "Not found orders"));
    }
    const total = await CourseOrderModel.countDocuments();
    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "All orders fetched successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
