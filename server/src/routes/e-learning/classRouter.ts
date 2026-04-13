import { createClass } from "../../controllers/e-learning/class/createClass";
import { deleteClass } from "../../controllers/e-learning/class/deleteClass";
import { getAllClasses } from "../../controllers/e-learning/class/getAllClasses";
import { getClassByFilter } from "../../controllers/e-learning/class/getClassByFilter";
import { getClassBySlug } from "../../controllers/e-learning/class/getClassById";
import { updateClass } from "../../controllers/e-learning/class/updateClass";
import { updateClassStatus } from "../../controllers/e-learning/class/updateClassStatus";
import { multerUploader } from "../../lib/multer";
import { classValidationRules, validateClass, validateUpdateClass } from "../../middleware/class/classValidator";

import { Router } from "express";
const router = Router();

const supportedAudioFormat = [
  "audio/mpeg",   // mp3
  "audio/wav",
  "audio/ogg",
  "audio/mp4",    // m4a
  "audio/webm",
  "audio/aac"
]
const supportedVideoFormat = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/x-msvideo",
  "video/quicktime",
  "video/x-matroska"
]

const multiFileUploader = multerUploader("classes", [...supportedAudioFormat, ...supportedVideoFormat, "image/jpeg", "image/png", "image/webp"]);

router.post(
  "/class",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "audiosOne", maxCount: 10 },
    { name: "audiosTwo", maxCount: 10 },
    { name: "videosOne", maxCount: 10 },
    { name: "videosTwo", maxCount: 10 }
  ]),

  classValidationRules,
  validateClass,
  createClass
);
router.put(
  "/class/:id",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "audiosOne", maxCount: 10 },
    { name: "audiosTwo", maxCount: 10 },
    { name: "videosOne", maxCount: 10 },
    { name: "videosTwo", maxCount: 10 }
  ]),
  classValidationRules,
  validateUpdateClass,
  updateClass
);
router.put("/class-status/:id", updateClassStatus);
router.delete("/class/:id", deleteClass);
router.get("/class/:slug", getClassBySlug);
router.get("/classes", getAllClasses);
router.get("/classes-by-filter", getClassByFilter);

export default router;