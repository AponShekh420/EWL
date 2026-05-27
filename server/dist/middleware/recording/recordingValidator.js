"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecording = exports.recordingUpdateValidationRules = exports.recordingValidationRules = void 0;
const express_validator_1 = require("express-validator");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.recordingValidationRules = [
    (0, express_validator_1.body)("heading").notEmpty().withMessage("Heading is required"),
    (0, express_validator_1.body)("recordingCategory")
        .notEmpty()
        .withMessage("Recording category is required"),
    // speaker → required only when recordingCategory = "free"
    (0, express_validator_1.body)("speakerId")
        .if((0, express_validator_1.body)("recordingCategory").equals("free"))
        .notEmpty()
        .withMessage("Speaker is required when category is free")
        .isMongoId()
        .withMessage("Speaker must be a valid MongoDB ObjectId"),
    // gender → required only when recordingCategory = "free"
    (0, express_validator_1.body)("gender")
        .if((0, express_validator_1.body)("recordingCategory").equals("free"))
        .notEmpty()
        .withMessage("Gender is required when category is free"),
    // class → required only when recordingCategory = "class"
    (0, express_validator_1.body)("classId")
        .if((0, express_validator_1.body)("recordingCategory").equals("class"))
        .notEmpty()
        .withMessage("Class is required when category is class")
        .isMongoId()
        .withMessage("Class must be a valid MongoDB ObjectId"),
    // course → required only when recordingCategory = "course"
    (0, express_validator_1.body)("courseId")
        .if((0, express_validator_1.body)("recordingCategory").equals("course") || (0, express_validator_1.body)("recordingCategory").equals("course-demo"))
        .notEmpty()
        .withMessage("Course is required when category is course")
        .isMongoId()
        .withMessage("Course must be a valid MongoDB ObjectId"),
    (0, express_validator_1.body)("recordings").custom((value, { req }) => {
        let recordings = value;
        // If string, parse it
        if (typeof value === "string") {
            try {
                recordings = JSON.parse(value);
            }
            catch (err) {
                throw new Error("Recordings must be valid JSON");
            }
        }
        if (!Array.isArray(recordings)) {
            throw new Error("Recordings must be an array");
        }
        if (recordings.length === 0) {
            throw new Error("Recordings cannot be empty");
        }
        for (const item of recordings) {
            if (typeof item !== "object" || item === null) {
                throw new Error("Each recording must be an object");
            }
        }
        return true;
    }),
];
exports.recordingUpdateValidationRules = [
    (0, express_validator_1.body)("heading").notEmpty().withMessage("Heading is required"),
    (0, express_validator_1.body)("recordingCategory")
        .notEmpty()
        .withMessage("Recording category is required"),
    // speaker → required only when recordingCategory = "free"
    (0, express_validator_1.body)("speakerId")
        .if((0, express_validator_1.body)("recordingCategory").equals("free"))
        .notEmpty()
        .withMessage("Speaker is required when category is free")
        .isMongoId()
        .withMessage("Speaker must be a valid MongoDB ObjectId"),
    // gender → required only when recordingCategory = "free"
    (0, express_validator_1.body)("gender")
        .if((0, express_validator_1.body)("recordingCategory").equals("free"))
        .notEmpty()
        .withMessage("Gender is required when category is free"),
    // class → required only when recordingCategory = "class"
    (0, express_validator_1.body)("classId")
        .if((0, express_validator_1.body)("recordingCategory").equals("class"))
        .notEmpty()
        .withMessage("Class is required when category is class")
        .isMongoId()
        .withMessage("Class must be a valid MongoDB ObjectId"),
    // course → required only when recordingCategory = "course"
    (0, express_validator_1.body)("courseId")
        .if((0, express_validator_1.body)("recordingCategory").equals("course") || (0, express_validator_1.body)("recordingCategory").equals("course-demo"))
        .notEmpty()
        .withMessage("Course is required when category is course")
        .isMongoId()
        .withMessage("Course must be a valid MongoDB ObjectId"),
];
const validateRecording = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const imageDeleteHandler = () => {
        if (req.files) {
            const files = Object.values(req.files).flat();
            files.forEach((file) => {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "recording");
            });
        }
    };
    if (Object.keys(errors).length > 0) {
        imageDeleteHandler();
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors,
        });
    }
    next();
};
exports.validateRecording = validateRecording;
