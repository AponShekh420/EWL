"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClassStatus = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const updateClassStatus = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const body = req.body;
        if (!id)
            return next((0, http_errors_1.default)(400, "Class ID is required"));
        // Find old class
        const oldClass = await ClassModel_1.default.findById(id);
        if (!oldClass)
            return next((0, http_errors_1.default)(404, "Class not found"));
        const updatedData = { ...body };
        if (body.status) {
            updatedData.status = body.status;
        }
        // ---- UPDATE CLASS ----
        const updatedClass = await ClassModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedClass,
            message: "Class status updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateClassStatus = updateClassStatus;
