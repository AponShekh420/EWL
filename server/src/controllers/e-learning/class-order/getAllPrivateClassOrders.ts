import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { OrderModel } from "../../../models/OrderModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import classModel from "../../../models/ClassModel";
import { ClassOrderModel } from "../../../models/ClassOrderModel";

export const getAllPrivateClassOrder = async (
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
    // Always filter by customer
    let searchQuery: Record<string, any> = { customer: req.user?._id };

    if (query.search) {
      const classes = await classModel
        .find({
          title: { $regex: query.search, $options: "i" },
        })
        .select("_id");

      if (classes.length > 0) {
        searchQuery["classes._id"] = { $in: classes.map((p) => p._id) };
      } else {
        // No matching classes → return empty result immediately
        return res.json({ orders: [], total: 0 });
      }
    }

    const orders = await ClassOrderModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "classes._id", // populate class refs inside classes array
          populate: {
            path: "speaker",
            select: "firstName lastName avatar userName _id"
          }
        },
        {
          path: "customer",
          select: "-password"
        }
      ]);
    if (!orders) {
      return next(createError(400, "Not found orders"));
    }
    const total = await OrderModel.countDocuments();
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
