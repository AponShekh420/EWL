"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecording = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const deleteRecording = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Recording ID is required"));
        const deletedRecording = await RecordingModel_1.default.findByIdAndDelete(id);
        if (!deletedRecording) {
            return next((0, http_errors_1.default)(404, `Recording with id ${id} not found`));
        }
        const images = deletedRecording.recordings
            .map((recording) => recording.file)
            .filter((file) => Boolean(file));
        (0, deleteFileFromLocal_1.deleteFileFromLocal)(images, "recording");
        return res.status(200).json({
            success: true,
            status: 201,
            data: deletedRecording,
            message: `Product with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteRecording = deleteRecording;
