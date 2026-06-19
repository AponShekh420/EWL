import { NextFunction, Request, Response } from "express";
import courseModel from "../../../models/CourseModel";
import { CourseOrderModel } from "../../../models/CourseOrderModel";
import RecordingModel from "../../../models/RecordingModel";
import createError from "http-errors";


const getCoursePrivateRecords = async (req: Request, res: Response, next: NextFunction) => {
    const {slug, module} = req.body;
    console.log("slug,", slug)
    const course = await courseModel.findOne({slug});
    if(course) {
        const order = await CourseOrderModel.findOne({
            "courses._id": course._id,
            customer: req?.user?._id
        })
        if(order) {
            let records;
            if(order.modules.length > 0) {
                records = await RecordingModel.find({course: course._id, recordingCategory: "course", module: module}).populate([
                {
                    path: "course",
                    select: "title",
                    populate: {
                    path: "speaker",
                    select: "firstName lastName"
                    }
                }
                ])
            } else {
                records = await RecordingModel.find({course: course._id, recordingCategory: "course"}).populate([
                    {
                        path: "course",
                        select: "title",
                        populate: {
                        path: "speaker",
                        select: "firstName lastName"
                        }
                    }
                ]);
            }
            if(records) {
            res.status(200).json({
                success: true,
                data: records,
                modules: order?.modules || [],
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
}

export default getCoursePrivateRecords;