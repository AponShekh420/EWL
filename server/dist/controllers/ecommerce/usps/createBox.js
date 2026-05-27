"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBox = void 0;
const UspsBoxModel_1 = __importDefault(require("../../../models/UspsBoxModel"));
const createBox = async (req, res) => {
    console.log("Received box data:", req.body); // Debug log to check incoming data
    try {
        const updates = req.body;
        const bulkOps = updates.map((box) => ({
            updateOne: {
                filter: {
                    name: box.name
                },
                update: {
                    $set: {
                        name: box.name,
                        type: box.type,
                        emptyWeight: box.emptyWeight,
                        dimensions: box.dimensions,
                        maxWeight: box.maxWeight,
                        isActive: box.isActive
                    }
                },
                upsert: true
            }
        }));
        const result = await UspsBoxModel_1.default.bulkWrite(bulkOps);
        res.json({
            success: true,
            message: "Boxes upserted successfully",
            result,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.createBox = createBox;
exports.default = exports.createBox;
