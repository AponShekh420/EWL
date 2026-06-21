import { Request, Response } from "express";
import RecordingModel from "../../../models/RecordingModel";

const getModulesInfo = async (req: Request, res: Response) => {
    const {modules, courseId} = req.body;
    const newModule = []

    for(let module of modules) {
        const records = await RecordingModel.countDocuments({course: courseId, module: module.name});
        module.recordsNumber = records
        newModule.push(module)
    }
    res.status(200).json({
        data: newModule
    })
}

export default getModulesInfo;