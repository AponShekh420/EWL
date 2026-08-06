"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllResources = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourcesModel_1 = __importDefault(require("../../../models/ResourcesModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllResources = async (req, res, next) => {
    try {
        const resources = await ResourcesModel_1.default.find();
        if (!resources) {
            return next((0, http_errors_1.default)(400, "Not found resources"));
        }
        res.status(200).json({
            success: true,
            data: resources,
            message: "All resources fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllResources = getAllResources;
