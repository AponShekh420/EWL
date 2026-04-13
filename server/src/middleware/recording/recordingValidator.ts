import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const recordingValidationRules = [
  body("heading").notEmpty().withMessage("Heading is required"),

  body("recordingCategory")
    .notEmpty()
    .withMessage("Recording category is required"),

  // speaker → required only when recordingCategory = "free"
  body("speakerId")
    .if(body("recordingCategory").equals("free"))
    .notEmpty()
    .withMessage("Speaker is required when category is free")
    .isMongoId()
    .withMessage("Speaker must be a valid MongoDB ObjectId"),

  // gender → required only when recordingCategory = "free"
  body("gender")
    .if(body("recordingCategory").equals("free"))
    .notEmpty()
    .withMessage("Gender is required when category is free"),

  // class → required only when recordingCategory = "class"
  body("classId")
    .if(body("recordingCategory").equals("class"))
    .notEmpty()
    .withMessage("Class is required when category is class")
    .isMongoId()
    .withMessage("Class must be a valid MongoDB ObjectId"),

  // course → required only when recordingCategory = "course"
  body("courseId")
    .if(body("recordingCategory").equals("course"))
    .notEmpty()
    .withMessage("Course is required when category is course")
    .isMongoId()
    .withMessage("Course must be a valid MongoDB ObjectId"),

  body("recordings").custom((value, { req }) => {
    let recordings = value;

    // If string, parse it
    if (typeof value === "string") {
      try {
        recordings = JSON.parse(value);
      } catch (err) {
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
export const recordingUpdateValidationRules = [
  body("heading").notEmpty().withMessage("Heading is required"),

  body("recordingCategory")
    .notEmpty()
    .withMessage("Recording category is required"),

  // speaker → required only when recordingCategory = "free"
  body("speakerId")
    .if(body("recordingCategory").equals("free"))
    .notEmpty()
    .withMessage("Speaker is required when category is free")
    .isMongoId()
    .withMessage("Speaker must be a valid MongoDB ObjectId"),

  // gender → required only when recordingCategory = "free"
  body("gender")
    .if(body("recordingCategory").equals("free"))
    .notEmpty()
    .withMessage("Gender is required when category is free"),

  // class → required only when recordingCategory = "class"
  body("classId")
    .if(body("recordingCategory").equals("class"))
    .notEmpty()
    .withMessage("Class is required when category is class")
    .isMongoId()
    .withMessage("Class must be a valid MongoDB ObjectId"),

  // course → required only when recordingCategory = "course"
  body("courseId")
    .if(body("recordingCategory").equals("course"))
    .notEmpty()
    .withMessage("Course is required when category is course")
    .isMongoId()
    .withMessage("Course must be a valid MongoDB ObjectId"),
];

export const validateRecording = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).mapped();

  const imageDeleteHandler = () => {
    if (req.files) {
      const files = Object.values(
        req.files as any,
      ).flat() as Express.Multer.File[];
      files.forEach((file) => {
        deleteFileFromLocal(file.filename, "recordings");
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
