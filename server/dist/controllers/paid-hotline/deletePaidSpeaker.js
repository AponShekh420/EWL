"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaidSpeaker = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const PaidSpeaker_1 = require("../../models/PaidSpeaker");
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
const deletePaidSpeaker = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Paid speaker ID is required"));
        const deletedSpeaker = await PaidSpeaker_1.PaidSpeakerModel.findByIdAndDelete(id);
        if (!deletedSpeaker) {
            return next((0, http_errors_1.default)(404, `Paid Speaker with id ${id} not found`));
        }
        (0, deleteFileFromLocal_1.deleteFileFromLocal)(deletedSpeaker.avatar, "profile");
        return res.status(200).json({
            success: true,
            data: deletedSpeaker,
            message: `Paid speaker with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deletePaidSpeaker = deletePaidSpeaker;
