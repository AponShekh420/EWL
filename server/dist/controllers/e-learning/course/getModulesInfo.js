"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const getModulesInfo = async (req, res) => {
    const { modules, courseId } = req.body;
    const newModule = [];
    for (let module of modules) {
        const records = await RecordingModel_1.default.countDocuments({ course: courseId, module: module.name });
        module.recordsNumber = records;
        newModule.push(module);
    }
    res.status(200).json({
        data: newModule
    });
};
exports.default = getModulesInfo;
