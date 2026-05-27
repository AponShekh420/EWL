"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecording = void 0;
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const updateRecording = async (req, res, next) => {
    try {
        const files = req.files;
        const body = req.body;
        const deletedImages = body.deletedImages ? body.deletedImages : [];
        const id = req.params?.id;
        const existingRecordings = JSON.parse(body.existingRecordings).length > 0
            ? JSON.parse(body.existingRecordings)
            : [];
        const recordingsObj = {
            heading: body.heading,
            recordingCategory: body.recordingCategory,
            recordings: existingRecordings,
        };
        // FormData usually sends array as string
        const parsedRecordings = typeof body.recordings === "string"
            ? JSON.parse(body.recordings)
            : body.recordings;
        if (parsedRecordings && parsedRecordings.length > 0 && files.length > 0) {
            let index = 0;
            const newRecordings = parsedRecordings.map((rec) => {
                if (rec.externalLink) {
                    return rec;
                }
                else {
                    const fileWithRec = {
                        ...rec,
                        file: files[index]?.filename || null,
                    };
                    index++;
                    return fileWithRec;
                }
            });
            recordingsObj.recordings = [...newRecordings, existingRecordings];
        }
        if (parsedRecordings && parsedRecordings.length > 0 && files.length <= 0) {
            recordingsObj.recordings = [...parsedRecordings, ...existingRecordings];
        }
        if (body.gender)
            recordingsObj.gender = body.gender;
        if (body.speakerId)
            recordingsObj.speaker = body.speakerId;
        if (body.courseId)
            recordingsObj.course = body.courseId;
        if (body.classId)
            recordingsObj.class = body.classId;
        const recordingData = await RecordingModel_1.default.findByIdAndUpdate(id, recordingsObj);
        if (recordingData && deletedImages.length > 0) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)(deletedImages, "recording");
        }
        return res.status(201).json({
            success: true,
            status: 201,
            data: recordingData,
            message: "Recording updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateRecording = updateRecording;
