"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassBySlug = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const ClassOrderModel_1 = require("../../../models/ClassOrderModel");
const getClassBySlug = async (req, res, next) => {
    try {
        let ordered = false;
        const slug = req.params?.slug;
        if (!slug)
            return next((0, http_errors_1.default)(400, "Class slug is required"));
        const classItem = await ClassModel_1.default.findOne({ slug }).populate("speaker", "firstName lastName avatar _id userName");
        if (!classItem) {
            return next((0, http_errors_1.default)(400, "Not found class"));
        }
        if (req.user) {
            const order = await ClassOrderModel_1.ClassOrderModel.findOne({
                "classes._id": classItem._id,
                customer: req?.user?._id
            });
            if (order) {
                ordered = true;
            }
        }
        return res.status(200).json({
            success: true,
            data: classItem,
            message: "Class fetched by slug successfully",
            ordered,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getClassBySlug = getClassBySlug;
