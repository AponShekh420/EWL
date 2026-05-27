"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordingById = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getRecordingById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Recording id is required"));
        const recording = await RecordingModel_1.default.findById(id);
        if (!recording) {
            return next((0, http_errors_1.default)(400, "Not found Recording"));
        }
        return res.status(200).json({
            success: true,
            data: recording,
            message: "Recording fetched by id successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getRecordingById = getRecordingById;
