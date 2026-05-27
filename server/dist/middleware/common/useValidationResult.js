"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// const deleteFileFromSpace = require("../../utils/deleteFileFromSpace");
const useValidationResult = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const mapped = errors.mapped();
    if (Object.keys(mapped).length === 0) {
        next();
    }
    else {
        // Handle errors and delete files if necessary
        //    if (req.files && req.files.length > 0) {
        //         const fileLocation = req?.files[0]?.location;
        //         if (fileLocation) {
        //             try {
        //                 // Make sure to pass the correct bucket name and URL
        //                 for(let file of req?.files) {
        //                     await deleteFileFromSpace('assets-upload', file?.location)
        //                 }
        //             } catch (error) {
        //                 console.error("Error deleting file from space:", error.message);
        //             }
        //         } else {
        //             console.error("File location is undefined.");
        //         }
        //     }
        res.status(403).json({
            errors: mapped,
        });
    }
};
exports.default = useValidationResult;
