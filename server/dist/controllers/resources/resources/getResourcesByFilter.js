"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourcesByFilter = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourcesModel_1 = __importDefault(require("../../../models/ResourcesModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getResourcesByFilter = async (req, res, next) => {
    try {
        const query = req.query;
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const skip = (page - 1) * limit;
        let searchQuery = {};
        let sortQuery = { createdAt: -1 }; // default
        if (query.search) {
            searchQuery = {
                $or: [{ title: { $regex: query.search, $options: "i" } }],
            };
        }
        if (query.category) {
            searchQuery.category = query.category;
        }
        if (query.status) {
            searchQuery.status = query.status;
        }
        const resources = await ResourcesModel_1.default.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .sort(sortQuery);
        if (!resources) {
            return next((0, http_errors_1.default)(400, "Not found Resources"));
        }
        const total = await ResourcesModel_1.default.countDocuments();
        res.status(200).json({
            success: true,
            data: resources,
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
            message: "All Resources fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getResourcesByFilter = getResourcesByFilter;
