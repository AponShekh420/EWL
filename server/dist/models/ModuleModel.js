"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleModel = void 0;
const mongoose_1 = require("mongoose");
const ModuleSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: false,
        default: 0,
    },
    records: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Recording", required: false }],
}, { timestamps: true });
exports.ModuleModel = (0, mongoose_1.model)("Module", ModuleSchema);
