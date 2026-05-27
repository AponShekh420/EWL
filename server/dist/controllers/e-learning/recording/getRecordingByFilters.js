"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordingByFilters = void 0;
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getRecordingByFilters = async (req, res, next) => {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    console.log("filter");
    if (query.search) {
        searchQuery = {
            $or: [{ name: { $regex: query.search, $options: "i" } }],
        };
    }
    try {
        const recordings = await RecordingModel_1.default.find(searchQuery).populate([
            {
                path: "class", // populate class refs inside classes array
                select: "title",
                populate: {
                    path: "speaker",
                    select: "firstName lastName gender"
                }
            },
            {
                path: "course", // populate class refs inside classes array
                select: "title",
                populate: {
                    path: "speaker",
                    select: "firstName lastName gender"
                }
            },
            {
                path: "speaker", // populate class refs inside classes array
                select: "firstName lastName gender"
            },
        ])
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await RecordingModel_1.default.countDocuments();
        res.status(200).json({
            success: true,
            data: recordings,
            message: "All recordings fetched successfully",
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getRecordingByFilters = getRecordingByFilters;
