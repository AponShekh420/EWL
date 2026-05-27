"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createRecording_1 = require("../../controllers/e-learning/recording/createRecording");
const deleteRecording_1 = require("../../controllers/e-learning/recording/deleteRecording");
const getRecordingByFilters_1 = require("../../controllers/e-learning/recording/getRecordingByFilters");
const getRecordingById_1 = require("../../controllers/e-learning/recording/getRecordingById");
const updateRecording_1 = require("../../controllers/e-learning/recording/updateRecording");
const multer_1 = require("../../lib/multer");
const recordingValidator_1 = require("../../middleware/recording/recordingValidator");
const getPrivateRecords_1 = require("../../controllers/e-learning/recording/getPrivateRecords");
const authCheck_1 = __importDefault(require("../../middleware/common/authCheck"));
const router = (0, express_1.Router)();
const multiFileUploader = (0, multer_1.multerUploader)("recording", ["audio/mpeg", "audio/wav", "audio/ogg", "video/mp4", "video/webm"], 100 * 1024 * 1024); // 100MB limit
router.post("/recording", multiFileUploader.any(), recordingValidator_1.recordingValidationRules, recordingValidator_1.validateRecording, createRecording_1.createRecording);
router.put("/recording/:id", multiFileUploader.any(), recordingValidator_1.recordingUpdateValidationRules, recordingValidator_1.validateRecording, updateRecording_1.updateRecording);
router.get("/recording-by-filter", getRecordingByFilters_1.getRecordingByFilters);
router.get("/recording/:id", getRecordingById_1.getRecordingById);
router.delete("/recording/:id", deleteRecording_1.deleteRecording);
// get private
router.post("/private/records", authCheck_1.default, getPrivateRecords_1.getPrivateRecords);
exports.default = router;
