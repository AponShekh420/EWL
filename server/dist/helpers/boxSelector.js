"use strict";
// services/boxSelector.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBestBoxForCart = void 0;
const UspsBoxModel_1 = __importDefault(require("../models/UspsBoxModel"));
const findBestBoxForCart = async (items) => {
    const boxes = await UspsBoxModel_1.default.find({ isActive: true });
    // console.log("Available boxes:", boxes);
    if (!boxes.length) {
        return null; // no boxes configured
    }
    const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
    const sorted = boxes?.sort((a, b) => (a?.maxWeight || 0) - (b?.maxWeight || 0));
    // ✅ 1. perfect match
    for (let box of sorted) {
        if (totalWeight <= box.maxWeight) {
            return {
                box,
                type: "BOX"
            };
        }
    }
    // ⚠️ 2. no match → fallback to custom parcel
    return {
        box: null,
        type: "CUSTOM"
    };
};
exports.findBestBoxForCart = findBestBoxForCart;
