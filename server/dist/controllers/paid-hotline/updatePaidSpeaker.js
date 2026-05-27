"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaidSpeaker = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const PaidSpeaker_1 = require("../../models/PaidSpeaker");
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
const updatePaidSpeaker = async (req, res, next) => {
    const id = req.params?.id;
    const body = req.body;
    const file = req.file;
    try {
        if (!id)
            return next((0, http_errors_1.default)(400, "Paid Speaker ID is required"));
        // Find old user
        const oldUser = await PaidSpeaker_1.PaidSpeakerModel.findById(id);
        if (!oldUser)
            return next((0, http_errors_1.default)(404, "Paid speaker not found"));
        const updatedData = { ...body };
        if (file) {
            updatedData.avatar = file.filename;
        }
        // ---- UPDATE USER ----
        const updatedUser = await PaidSpeaker_1.PaidSpeakerModel.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser)
            return next((0, http_errors_1.default)(400, "Failed to update paid speaker"));
        if (file && oldUser.avatar) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)(oldUser.avatar, "profile");
        }
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "Paid speaker updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updatePaidSpeaker = updatePaidSpeaker;
