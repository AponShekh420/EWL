import express from "express";
import { createPaidSpeaker } from "../controllers/paid-hotline/createPaidSpeaker";
import { deletePaidSpeaker } from "../controllers/paid-hotline/deletePaidSpeaker";
import { getAllFilterPaidSpeaker } from "../controllers/paid-hotline/getAllFilterPaidSpeaker";
import { getAllPaidSpeaker } from "../controllers/paid-hotline/getAllPaidSpeaker";
import { getPaidSpeakerById } from "../controllers/paid-hotline/getPaidSpeakerById";
import { updatePaidSpeaker } from "../controllers/paid-hotline/updatePaidSpeaker";
import { multerUploader } from "../lib/multer";
import {
  paidHotlineSpeakerRules,
  validatePaidHotlineSpeaker,
} from "../middleware/paid-hotline-speaker/paidHotlineSpeaker";

const singleFileUploader = multerUploader("profile");
const router = express.Router();

router.post(
  "/speaker",
  singleFileUploader.single("avatar"),
  paidHotlineSpeakerRules,
  validatePaidHotlineSpeaker,
  createPaidSpeaker,
);
router.put(
  "/speaker/:id",
  singleFileUploader.single("avatar"),
  paidHotlineSpeakerRules,
  validatePaidHotlineSpeaker,
  updatePaidSpeaker,
);

router.delete("/speaker/:id", deletePaidSpeaker);
router.get("/filter-speaker", getAllFilterPaidSpeaker);
router.get("/speaker", getAllPaidSpeaker);
router.get("/speaker/:id", getPaidSpeakerById);

export default router;
