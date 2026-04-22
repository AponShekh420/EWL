import UspsBoxModel from "../../../models/UspsBoxModel";
import { Request, Response } from "express";
const express = require("express");
const router = express.Router();

export const getBoxes = async (req: Request, res: Response) => {
    try {
        const boxes = await UspsBoxModel.find();
        return res.status(200).json({
            success: true,
            data: boxes
        });
    } catch (error) {
        console.error("Error fetching boxes:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}