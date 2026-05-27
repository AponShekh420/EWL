"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClasses = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const getAllClasses = async (req, res, next) => {
    try {
        const classes = await ClassModel_1.default.find();
        if (!classes) {
            return next((0, http_errors_1.default)(400, "Not found classes"));
        }
        res.status(200).json({
            success: true,
            data: classes,
            message: "All Classes fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllClasses = getAllClasses;
