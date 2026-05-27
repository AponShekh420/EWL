"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecording = void 0;
const RecordingModel_1 = __importDefault(require("../../../models/RecordingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const createRecording = async (req, res, next) => {
    try {
        const files = req.files;
        const body = req.body;
        // FormData usually sends array as string
        const parsedRecordings = typeof body.recordings === "string"
            ? JSON.parse(body.recordings)
            : body.recordings;
        let index = 0;
        const recordings = parsedRecordings.map((rec) => {
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
        const recordingsObj = {
            heading: body.heading,
            recordingCategory: body.recordingCategory,
            recordings,
        };
        if (body.gender)
            recordingsObj.gender = body.gender;
        if (body.speakerId)
            recordingsObj.speaker = body.speakerId;
        if (body.courseId)
            recordingsObj.course = body.courseId;
        if (body.classId)
            recordingsObj.class = body.classId;
        const recordingData = await RecordingModel_1.default.create(recordingsObj);
        return res.status(201).json({
            success: true,
            status: 201,
            data: recordingData,
            message: "Recording created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createRecording = createRecording;
