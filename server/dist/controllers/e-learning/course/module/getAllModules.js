"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleModel_1 = require("../../../../models/ModuleModel");
const getAllModules = async (req, res) => {
    try {
        const modules = await ModuleModel_1.ModuleModel.find().sort({ id: 1 });
        console.log("Modules fetched successfully:", modules);
        return res.status(200).json({
            message: "Modules fetched successfully",
            modules,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({
            error: message,
        });
    }
};
exports.default = getAllModules;
