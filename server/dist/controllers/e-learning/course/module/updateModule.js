"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleModel_1 = require("../../../../models/ModuleModel");
const CourseOrderModel_1 = require("../../../../models/CourseOrderModel");
const CourseModel_1 = __importDefault(require("../../../../models/CourseModel"));
const RecordingModel_1 = __importDefault(require("../../../../models/RecordingModel"));
const updateModule = async (req, res) => {
    const { name: moduleName, id } = req.body;
    try {
        if (!moduleName) {
            return res.status(400).json({ error: "Name is required" });
        }
        const updatedModule = await ModuleModel_1.ModuleModel.findOneAndUpdate({ id: Number(id) }, {
            name: moduleName,
        }, {
            // new: true,
            runValidators: true,
        });
        if (!updatedModule) {
            return res.status(404).json({ error: "Module not found" });
        }
        if (updatedModule) {
            await CourseOrderModel_1.CourseOrderModel.updateMany({
                "modules.id": updatedModule.id,
            }, {
                $set: {
                    "modules.$[module].name": moduleName,
                },
            }, {
                arrayFilters: [
                    {
                        "module.id": updatedModule.id,
                    },
                ],
            });
            await CourseModel_1.default.updateMany({
                "modules.id": updatedModule.id,
            }, {
                $set: {
                    "modules.$[module].name": moduleName,
                },
            }, {
                arrayFilters: [
                    {
                        "module.id": updatedModule.id,
                    },
                ],
            });
            await RecordingModel_1.default.updateMany({ module: updatedModule.name }, { $set: { module: moduleName } });
        }
        return res.status(200).json({
            message: "Module updated successfully",
            module: updatedModule,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: message });
    }
};
exports.default = updateModule;
