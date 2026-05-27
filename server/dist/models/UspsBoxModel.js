"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Box.js
const mongoose_1 = __importDefault(require("mongoose"));
const boxSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["ENVELOPE", "BOX"]
    },
    emptyWeight: {
        type: Number,
        default: 0
    },
    dimensions: {
        length: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        }
    },
    maxWeight: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
const UspsBoxModel = mongoose_1.default.models.Box || mongoose_1.default.model("Box", boxSchema);
exports.default = UspsBoxModel;
