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
import { getPrivateRecords } from "../../controllers/e-learning/recording/getPrivateRecords";
import authCheck from "../../middleware/common/authCheck";
import getCoursePrivateRecords from "../../controllers/e-learning/recording/getCoursePrivateRecords";
import getOrderedModules from "../../controllers/e-learning/recording/getOrderedModules";
import getModulesInfo from "../../controllers/e-learning/course/getModulesInfo";
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


// get private
router.post("/private/records", authCheck, getPrivateRecords)
router.post("/course-private/records", authCheck, getCoursePrivateRecords)
router.post("/course-modules", authCheck, getOrderedModules)
router.post("/course-modules-new", authCheck, getModulesInfo)

export default router;
