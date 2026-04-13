import { Router } from "express";
import { createRecording } from "../../controllers/e-learning/recording/createRecording";
import { deleteRecording } from "../../controllers/e-learning/recording/deleteRecording";
import { getRecordingByFilters } from "../../controllers/e-learning/recording/getRecordingByFilters";
import { getRecordingById } from "../../controllers/e-learning/recording/getRecordingById";
import { updateRecording } from "../../controllers/e-learning/recording/updateRecording";
import { multerUploader } from "../../lib/multer";
import {
  recordingUpdateValidationRules,
  recordingValidationRules,
  validateRecording,
} from "../../middleware/recording/recordingValidator";
const router = Router();

const multiFileUploader = multerUploader(
  "recording",
  ["audio/mpeg", "audio/wav", "audio/ogg", "video/mp4", "video/webm"],
  100 * 1024 * 1024,
); // 100MB limit

router.post(
  "/recording",
  multiFileUploader.any(),
  recordingValidationRules,
  validateRecording,
  createRecording,
);
router.put(
  "/recording/:id",
  multiFileUploader.any(),
  recordingUpdateValidationRules,
  validateRecording,
  updateRecording,
);
router.get("/recording-by-filter", getRecordingByFilters);
router.get("/recording/:id", getRecordingById);
router.delete("/recording/:id", deleteRecording);

export default router;
