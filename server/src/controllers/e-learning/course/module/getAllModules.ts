import { Request, Response } from "express";
import { ModuleModel } from "../../../../models/ModuleModel";

const getAllModules = async (req: Request, res: Response) => {
    try {
        const modules = await ModuleModel.find().sort({ id: 1 });
        console.log("Modules fetched successfully:", modules);
        return res.status(200).json({
            message: "Modules fetched successfully",
            modules,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        return res.status(500).json({
            error: message,
        });
    }
};

export default getAllModules;