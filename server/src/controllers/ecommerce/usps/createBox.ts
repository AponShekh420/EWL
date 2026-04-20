import { Request, Response } from "express";
import UspsBoxModel from "../../../models/UspsBoxModel";

export const createBox = async (req: Request, res: Response) => {

    const newBox = req.body;

    if(newBox) {
        const createdBox = await UspsBoxModel.insertMany(newBox);
        if(createdBox) {
            return res.status(201).json({
                message: "Box created successfully",
                box: createdBox
            });
        } else {
            return res.status(500).json({ message: "Failed to create box" });
        }
    } else {
        return res.status(400).json({ message: "Invalid box data" });
    }

};

export default createBox;