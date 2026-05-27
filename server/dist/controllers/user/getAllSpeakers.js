"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSpeakers = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const getAllSpeakers = async (req, res, next) => {
    const query = req.query;
    // const page = Number(query?.page) || 1;
    // const limit = Number(query?.limit) || 10;
    // const skip = (page - 1) * limit;
    try {
        const searchQuery = {
            role: "speaker",
        };
        if (query.search) {
            searchQuery.$or = [
                { firstName: { $regex: query.search, $options: "i" } },
                { lastName: { $regex: query.search, $options: "i" } },
            ];
        }
        const users = await UserModel_1.default.find(searchQuery, { password: 0, isOrthodoxJew: 0, maritalStatus: 0, keepsMitzvos: 0, chafifaDuration: 0, chickenSoupInDairySink: 0 })
            .sort({ createdAt: -1 })
            .exec();
        if (!users) {
            return next((0, http_errors_1.default)(400, "Not found users"));
        }
        const total = users?.length;
        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                // page: page,
                // limit: limit,
                total: total,
                // totalPages: Math.ceil(total / limit),
            },
            message: "All Speakers fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllSpeakers = getAllSpeakers;
