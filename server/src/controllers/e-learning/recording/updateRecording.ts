import { NextFunction, Request, Response } from "express";
import RecordingModel from "../../../models/RecordingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";

interface RecordingBody {
  id: string;
  recordNumber: number;
  sourceType: string;
  mediaType: string;
  file?: string;
  externalLink?: string;
}

interface CreateRecordingBody {
  heading: string;
  recordingCategory: string;
  gender?: string;
  speaker?: string;
  course?: string;
  class?: string;
  recordings?: RecordingBody[];
}

export const updateRecording = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const body = req.body;
    const deletedImages = body.deletedImages ? body.deletedImages : [];
    const id = req.params?.id;

    const existingRecordings =
      JSON.parse(body.existingRecordings).length > 0
        ? JSON.parse(body.existingRecordings)
        : [];

    const recordingsObj: CreateRecordingBody = {
      heading: body.heading,
      recordingCategory: body.recordingCategory,
      recordings: existingRecordings,
    };
    // FormData usually sends array as string
    const parsedRecordings: RecordingBody[] =
      typeof body.recordings === "string"
        ? JSON.parse(body.recordings)
        : body.recordings;

    if (parsedRecordings && parsedRecordings.length > 0 && files.length > 0) {
      let index = 0;
      const newRecordings = parsedRecordings.map((rec) => {
        if (rec.externalLink) {
          return rec;
        } else {
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
    if (body.gender) recordingsObj.gender = body.gender;
    if (body.speakerId) recordingsObj.speaker = body.speakerId;
    if (body.courseId) recordingsObj.course = body.courseId;
    if (body.classId) recordingsObj.class = body.classId;
    const recordingData = await RecordingModel.findByIdAndUpdate(
      id,
      recordingsObj,
    );

    if (recordingData && deletedImages.length > 0) {
      deleteFileFromLocal(deletedImages, "recording");
    }

    return res.status(201).json({
      success: true,
      status: 201,
      data: recordingData,
      message: "Recording updated successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
