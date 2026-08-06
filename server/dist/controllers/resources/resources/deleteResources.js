"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResources = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourceCategory_1 = require("../../../models/ResourceCategory");
const ResourcesModel_1 = __importDefault(require("../../../models/ResourcesModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const deleteResources = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Resources ID is required"));
        const deletedResources = await ResourcesModel_1.default.findByIdAndDelete(id);
        if (!deletedResources) {
            return next((0, http_errors_1.default)(404, `Resources with id ${id} not found`));
        }
        if (deletedResources.thumbnail) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)([deletedResources.thumbnail], "resources");
        }
        await ResourceCategory_1.ResourceCategoryModel.findOneAndUpdate({ name: deletedResources.category }, { $pull: { resources: deletedResources._id } }, { new: true });
        return res.status(200).json({
            success: true,
            status: 201,
            data: deletedResources,
            message: `Resources with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteResources = deleteResources;
