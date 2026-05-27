"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateRecords = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const ClassOrderModel_1 = require("../../../models/ClassOrderModel");
const getPrivateRecords = async (req, res, next) => {
    try {
        console.log("record Worked");
        console.log("user", req.user);
        const { recordCategory, slug } = req.body;
        if (recordCategory == "course") {
            const course = await CourseModel_1.default.findOne({ slug });
            if (course) {
                const order = await CourseOrderModel_1.CourseOrderModel.findOne({
                    "courses._id": course._id,
                    customer: req?.user?._id
                });
                if (order) {
                    const records = await RecordingModel_1.default.find({ course: course._id, recordingCategory: "course" }).populate([
                        {
                            path: "course",
                            select: "title",
                            populate: {
                                path: "speaker",
                                select: "firstName lastName"
                            }
                        }
                    ]);
                    if (records) {
                        res.status(200).json({
                            success: true,
                            data: records,
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
        }
        else if (recordCategory == "class") {
            console.log("class");
            const eclass = await ClassModel_1.default.findOne({ slug });
            if (eclass) {
                console.log("eclass");
                const order = await ClassOrderModel_1.ClassOrderModel.findOne({
                    "classes._id": eclass._id,
                    customer: req?.user?._id
                });
                if (order) {
                    console.log("order");
                    const records = await RecordingModel_1.default.find({ class: eclass._id, recordingCategory: "class" }).populate([
                        {
                            path: "class",
                            select: "title",
                            populate: {
                                path: "speaker",
                                select: "firstName lastName"
                            }
                        }
                    ]);
                    if (records) {
                        res.status(200).json({
                            success: true,
                            data: records,
                            message: "All class records fetched successfully",
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
                return next((0, http_errors_1.default)(400, "Not found class"));
            }
        }
        else if (recordCategory == "free") {
            const records = await RecordingModel_1.default.find({ gender: req.user?.gender, recordingCategory: "free" }).populate([
                {
                    path: "speaker",
                    select: "firstName lastName gender"
                }
            ]);
            if (records) {
                res.status(200).json({
                    success: true,
                    data: records,
                    message: "All free records fetched successfully",
                });
            }
        }
        else if (recordCategory == "course-demo") {
            const course = await CourseModel_1.default.findOne({ slug });
            if (course) {
                const records = await RecordingModel_1.default.find({ course: course._id, recordingCategory: "course-demo" }).populate([
                    {
                        path: "course",
                        select: "title",
                        populate: {
                            path: "speaker",
                            select: "firstName lastName"
                        }
                    }
                ]);
                if (records) {
                    res.status(200).json({
                        success: true,
                        data: records,
                        message: "All course demo fetched successfully",
                    });
                }
                else {
                    return next((0, http_errors_1.default)(400, "Not found record"));
                }
            }
            else {
                return next((0, http_errors_1.default)(400, "Not found course demo"));
            }
        }
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getPrivateRecords = getPrivateRecords;
