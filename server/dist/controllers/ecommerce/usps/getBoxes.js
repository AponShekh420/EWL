"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoxes = void 0;
const UspsBoxModel_1 = __importDefault(require("../../../models/UspsBoxModel"));
const express = require("express");
const router = express.Router();
const getBoxes = async (req, res) => {
    try {
        const boxes = await UspsBoxModel_1.default.find();
        return res.status(200).json({
            success: true,
            data: boxes
        });
    }
    catch (error) {
        console.error("Error fetching boxes:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getBoxes = getBoxes;
