"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaidSpeaker = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const PaidSpeaker_1 = require("../../models/PaidSpeaker");
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const createPaidSpeaker = async (req, res, next) => {
    try {
        const body = req.body;
        const file = req.file;
        if (!file) {
            return next((0, http_errors_1.default)(400, "Avatar is required"));
        }
        const createdSpeaker = await PaidSpeaker_1.PaidSpeakerModel.create({
            ...body,
            avatar: file?.filename,
        });
        if (!createdSpeaker) {
            return next((0, http_errors_1.default)(400, "Failed to create paid speaker"));
        }
        return res.status(201).json({
            success: true,
            data: createdSpeaker,
            message: "Paid speaker created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createPaidSpeaker = createPaidSpeaker;
