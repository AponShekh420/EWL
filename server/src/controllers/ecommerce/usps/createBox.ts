import { Request, Response } from "express";
import UspsBoxModel from "../../../models/UspsBoxModel";

interface BoxUpdate {
    name: string;
    type: string;
    emptyWeight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    maxWeight: number;
    isActive: boolean;
}

export const createBox = async (req: Request, res: Response) => {
    console.log("Received box data:", req.body); // Debug log to check incoming data
    try {
    const updates: BoxUpdate[] = req.body;

    const bulkOps = updates.map((box: BoxUpdate) => ({
        updateOne:{
            filter:{
                name: box.name
            },
            update:{
                $set:{
                    name: box.name,
                    type: box.type,
                    emptyWeight: box.emptyWeight,
                    dimensions: box.dimensions,
                    maxWeight: box.maxWeight,
                    isActive: box.isActive
                }
            },
            upsert:true
        }
    }));

    const result = await UspsBoxModel.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: "Boxes upserted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }

};

export default createBox;
