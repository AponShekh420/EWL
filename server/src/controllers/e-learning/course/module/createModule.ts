import { Request, Response } from "express";
import { ModuleModel } from "../../../../models/ModuleModel";

const createModule = async (req: Request, res: Response) => {
    const { name } = req.body;

    console.log("Received request to create module:", { name });
    try{
        // Validate required fields
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const latestModel = await ModuleModel.findOne().sort({ id: -1 }).exec();
        

        // Create a new module object
        const newModule = {
            id: (latestModel ? Number(latestModel.id) + 1 : 1).toString(), // Increment the ID based on the latest module
            name,
        };

        const savedModule = await ModuleModel.create(newModule);
        const moduleUploaded = await savedModule.save();
        if(!savedModule){
            return res.status(500).json({ error: "Failed to create module" });
        }

        // Here you would typically save the newModule to your database
        // For demonstration, we'll just return it in the response

        return res.status(201).json({ message: "Module created successfully", module: savedModule });
    } 
    catch(err){
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: message });
    }
}

export default createModule;