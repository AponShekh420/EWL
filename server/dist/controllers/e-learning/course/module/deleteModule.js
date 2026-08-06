"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleModel_1 = require("../../../../models/ModuleModel");
const CourseOrderModel_1 = require("../../../../models/CourseOrderModel");
const CourseModel_1 = __importDefault(require("../../../../models/CourseModel"));
const RecordingModel_1 = __importDefault(require("../../../../models/RecordingModel"));
const deleteModule = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedModule = await ModuleModel_1.ModuleModel.findOneAndDelete({
            id: Number(id),
        });
        if (!deletedModule) {
            return res.status(404).json({
                error: "Module not found",
            });
        }
        // Remove module from all course orders
        await CourseOrderModel_1.CourseOrderModel.updateMany({
            "modules.id": deletedModule.id,
        }, {
            $pull: {
                modules: {
                    id: deletedModule.id,
                },
            },
        });
        // Remove module from all courses
        await CourseModel_1.default.updateMany({
            "modules.id": deletedModule.id,
        }, {
            $pull: {
                modules: {
                    id: deletedModule.id,
                },
            },
        });
        // Delete all recordings of this module
        await RecordingModel_1.default.updateMany({
            module: deletedModule.name,
        }, {
            $set: {
                module: null,
            }
        });
        return res.status(200).json({
            message: "Module deleted successfully",
            module: deletedModule,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({
            error: message,
        });
    }
};
exports.default = deleteModule;
