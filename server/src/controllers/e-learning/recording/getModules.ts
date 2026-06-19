import { NextFunction, Request, Response } from "express";
import courseModel from "../../../models/CourseModel";
import { CourseOrderModel } from "../../../models/CourseOrderModel";
import RecordingModel from "../../../models/RecordingModel";
import createError from "http-errors";


const getModules = async (req: Request, res: Response, next: NextFunction) => {
    const {slug} = req.body;
    const course = await courseModel.findOne({slug});
    if(course) {
    const order = await CourseOrderModel.findOne({
        "courses._id": course._id,
        customer: req?.user?._id
    })
    if(order) {
        res.status(200).json({
            success: true,
            modules: order?.modules || [],
            message: "All modules fetched successfully",
        });
    } else {
        return next(createError(400, "Not found Order"));
    }
    } else {
    return next(createError(400, "Not found course"));
    }
}

export default getModules;