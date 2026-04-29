import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import classModel from "../../../models/ClassModel";
import courseModel from "../../../models/CourseModel";
import { CourseOrderModel } from "../../../models/CourseOrderModel";
import RecordingModel from "../../../models/RecordingModel";
import { ClassOrderModel } from "../../../models/ClassOrderModel";

export const getPrivateRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("record Worked");
    console.log("user", req.user)
    const {recordCategory, slug} = req.body
    
    if(recordCategory == "course") {
      const course = await courseModel.findOne({slug});
      if(course) {
        const order = await CourseOrderModel.findOne({
          "courses._id": course._id,
          customer: req?.user?._id
        })
        if(order) {
          const records = await RecordingModel.find({course: course._id, recordingCategory: "course"}).populate([
            {
              path: "course",
              select: "title",
              populate: {
                path: "speaker",
                select: "firstName lastName"
              }
            }
          ])
          if(records) {
            res.status(200).json({
              success: true,
              data: records,
              message: "All course records fetched successfully",
            });
          } else {
            return next(createError(400, "Not found record"));
          }
        } else {
          return next(createError(400, "Not found Order"));
        }
      } else {
        return next(createError(400, "Not found course"));
      }
    } else if(recordCategory == "class") {
      console.log("class")
      const eclass = await classModel.findOne({slug});
      if(eclass) {
        console.log("eclass")
        const order = await ClassOrderModel.findOne({
          "classes._id": eclass._id,
          customer: req?.user?._id
        });
        if(order) {
          console.log("order")
          const records = await RecordingModel.find({class: eclass._id, recordingCategory: "class"}).populate([
            {
              path: "class",
              select: "title",
              populate: {
                path: "speaker",
                select: "firstName lastName"
              }
            }
          ])
          if(records) {
            res.status(200).json({
              success: true,
              data: records,
              message: "All class records fetched successfully",
            });
          } else {
            return next(createError(400, "Not found record"));
          }
        } else {
          return next(createError(400, "Not found Order"));
        }
      } else {
        return next(createError(400, "Not found class"));
      }
    } else if(recordCategory == "free") {
        const records = await RecordingModel.find({gender: req.user?.gender, recordingCategory: "free"})
        if(records) {
          res.status(200).json({
            success: true,
            data: records,
            message: "All free records fetched successfully",
          });
        }
    } else if(recordCategory == "course-demo") {
      const course = await courseModel.findOne({slug});
      if(course) {
        const records = await RecordingModel.find({course: course._id, recordingCategory: "course-demo"}).populate([
            {
              path: "course",
              select: "title",
              populate: {
                path: "speaker",
                select: "firstName lastName"
              }
            }
          ])
        if(records) {
          res.status(200).json({
            success: true,
            data: records,
            message: "All course demo fetched successfully",
          });
        } else {
          return next(createError(400, "Not found record"));
        }
      } else {
        return next(createError(400, "Not found course demo"));
      }
    } 
    
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
