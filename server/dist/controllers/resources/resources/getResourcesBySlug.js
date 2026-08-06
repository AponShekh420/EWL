"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourcesBySlug = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourcesModel_1 = __importDefault(require("../../../models/ResourcesModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getResourcesBySlug = async (req, res, next) => {
    try {
        const slug = req.params?.slug;
        if (!slug)
            return next((0, http_errors_1.default)(400, "Resources slug is required"));
        const resources = await ResourcesModel_1.default.findOne({ slug }).populate("creator", "firstName lastName userName email avatar");
        if (!resources) {
            return next((0, http_errors_1.default)(400, "Not found resources"));
        }
        return res.status(200).json({
            success: true,
            data: resources,
            message: "Resources fetched by slug successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getResourcesBySlug = getResourcesBySlug;
