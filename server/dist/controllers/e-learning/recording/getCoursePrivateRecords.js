"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const getCoursePrivateRecords = async (req, res, next) => {
    const { slug, module } = req.body;
    console.log("slug,", slug);
    const course = await CourseModel_1.default.findOne({ slug });
    if (course) {
        const order = await CourseOrderModel_1.CourseOrderModel.findOne({
            "courses._id": course._id,
            customer: req?.user?._id
        });
        if (order) {
            let records;
            if (order.modules.length > 0) {
                records = await RecordingModel_1.default.find({ course: course._id, recordingCategory: "course", module: module }).populate([
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
            else {
                records = await RecordingModel_1.default.find({ course: course._id, recordingCategory: "course" }).populate([
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
            if (records) {
                res.status(200).json({
                    success: true,
                    data: records,
                    modules: order?.modules || [],
                    message: "All course records fetched successfully",
                });
            }
            else {
                return next((0, http_errors_1.default)(400, "Not found record"));
            }
        }
        else {
            return next((0, http_errors_1.default)(400, "Not found Order"));
        }
    }
    else {
        return next((0, http_errors_1.default)(400, "Not found course"));
    }
};
exports.default = getCoursePrivateRecords;
