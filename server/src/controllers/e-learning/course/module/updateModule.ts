import { Request, Response } from "express";
import { ModuleModel } from "../../../../models/ModuleModel";
import { CourseOrderModel } from "../../../../models/CourseOrderModel";
import CourseModel from "../../../../models/CourseModel";
import RecordingModel from "../../../../models/RecordingModel";

const updateModule = async (req: Request, res: Response) => {
    const { name: moduleName, id } = req.body;

    try {
        if (!moduleName) {
            return res.status(400).json({ error: "Name is required" });
        }

        const updatedModule = await ModuleModel.findOneAndUpdate(
            { id: Number(id) },
            {
                name: moduleName,
            },
            {
                // new: true,
                runValidators: true,
            }
        );

        if (!updatedModule) {
            return res.status(404).json({ error: "Module not found" });
        }

        if(updatedModule) {
            await CourseOrderModel.updateMany(
                {
                    "modules.id": updatedModule.id,
                },
                {
                    $set: {
                    "modules.$[module].name": moduleName,
                    },
                },
                {
                    arrayFilters: [
                    {
                        "module.id": updatedModule.id,
                    },
                    ],
                }
            );

            await CourseModel.updateMany(
                {
                    "modules.id": updatedModule.id,
                },
                {
                    $set: {
                    "modules.$[module].name": moduleName,
                    },
                },
                {
                    arrayFilters: [
                    {
                        "module.id": updatedModule.id,
                    },
                    ],
                }
            );

            await RecordingModel.updateMany({module: updatedModule.name}, {$set: {module: moduleName}});
        }

        return res.status(200).json({
            message: "Module updated successfully",
            module: updatedModule,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: message });
    }
};

export default updateModule;