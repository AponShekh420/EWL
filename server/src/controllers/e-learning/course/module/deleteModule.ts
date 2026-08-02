import { Request, Response } from "express";
import { ModuleModel } from "../../../../models/ModuleModel";
import { CourseOrderModel } from "../../../../models/CourseOrderModel";
import CourseModel from "../../../../models/CourseModel";
import RecordingModel from "../../../../models/RecordingModel";

const deleteModule = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        const deletedModule = await ModuleModel.findOneAndDelete({
            id: Number(id),
        });

        if (!deletedModule) {
            return res.status(404).json({
                error: "Module not found",
            });
        }

        // Remove module from all course orders
        await CourseOrderModel.updateMany(
            {
                "modules.id": deletedModule.id,
            },
            {
                $pull: {
                    modules: {
                        id: deletedModule.id,
                    },
                },
            }
        );

        // Remove module from all courses
        await CourseModel.updateMany(
            {
                "modules.id": deletedModule.id,
            },
            {
                $pull: {
                    modules: {
                        id: deletedModule.id,
                    },
                },
            }
        );

        // Delete all recordings of this module
        await RecordingModel.updateMany({
            module: deletedModule.name,
        }, {
            $set: {
                module: null,
            }
        });

        return res.status(200).json({
            message: "Module deleted successfully",
            module: deletedModule,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        return res.status(500).json({
            error: message,
        });
    }
};

export default deleteModule;