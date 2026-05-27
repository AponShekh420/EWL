"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilterPaidSpeaker = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const PaidSpeaker_1 = require("../../models/PaidSpeaker");
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const getAllFilterPaidSpeaker = async (req, res, next) => {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    try {
        if (query.search) {
            searchQuery = {
                $or: [{ fullname: { $regex: query.search, $options: "i" } }],
            };
        }
        const paidSpeaker = await PaidSpeaker_1.PaidSpeakerModel.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
        if (!paidSpeaker) {
            return next((0, http_errors_1.default)(400, "Not found paid speaker"));
        }
        const total = await PaidSpeaker_1.PaidSpeakerModel.countDocuments();
        res.status(200).json({
            success: true,
            data: paidSpeaker,
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
            message: "All paid speaker fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllFilterPaidSpeaker = getAllFilterPaidSpeaker;
