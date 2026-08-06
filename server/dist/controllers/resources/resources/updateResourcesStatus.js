"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResourcesStatus = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourcesModel_1 = __importDefault(require("../../../models/ResourcesModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const updateResourcesStatus = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const body = req.body;
        if (!id)
            return next((0, http_errors_1.default)(400, "Resources ID is required"));
        // Find old blog
        const oldResources = await ResourcesModel_1.default.findById(id);
        if (!oldResources)
            return next((0, http_errors_1.default)(404, "Resources not found"));
        const updatedData = { ...body };
        if (body.status) {
            updatedData.status = body.status;
        }
        // ---- UPDATE BLOG ----
        const updatedResources = await ResourcesModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedResources,
            message: "Resources status updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateResourcesStatus = updateResourcesStatus;
