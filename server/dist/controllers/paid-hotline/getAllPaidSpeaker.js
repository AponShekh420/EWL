"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaidSpeaker = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const PaidSpeaker_1 = require("../../models/PaidSpeaker");
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const getAllPaidSpeaker = async (req, res, next) => {
    try {
        const paidSpeaker = await PaidSpeaker_1.PaidSpeakerModel.find()
            .sort({ createdAt: -1 })
            .exec();
        if (!paidSpeaker) {
            return next((0, http_errors_1.default)(400, "Not found paid speaker"));
        }
        res.status(200).json({
            success: true,
            data: paidSpeaker,
            message: "All paid speaker fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllPaidSpeaker = getAllPaidSpeaker;
