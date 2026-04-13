import { NextFunction, Request, Response } from "express";
import RecordingModel from "../../../models/RecordingModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";

interface RecordingBody {
  id: string;
  recordNumber: number;
  sourceType: string;
  mediaType: string;
  externalLink?: string;
}

interface CreateRecordingBody {
  heading: string;
  recordingCategory: string;
  gender?: string;
  speakerId?: string;
  courseId?: string;
  classId?: string;
  recordings: RecordingBody[] | string;
}

export const createRecording = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const body = req.body as CreateRecordingBody;

    // FormData usually sends array as string
    const parsedRecordings: RecordingBody[] =
      typeof body.recordings === "string"
        ? JSON.parse(body.recordings)
        : body.recordings;

    const recordings = parsedRecordings.map((rec, index) => ({
      ...rec,
      file: files[index]?.filename || null,
    }));

    const recordingsObj: {
      heading: string;
      recordingCategory: string;
      recordings: typeof recordings;
      gender?: string;
      speaker?: string;
      course?: string;
      class?: string;
    } = {
      heading: body.heading,
      recordingCategory: body.recordingCategory,
      recordings,
    };

    if (body.gender) recordingsObj.gender = body.gender;
    if (body.speakerId) recordingsObj.speaker = body.speakerId;
    if (body.courseId) recordingsObj.course = body.courseId;
    if (body.classId) recordingsObj.class = body.classId;

    const recordingData = await RecordingModel.create(recordingsObj);

    return res.status(201).json({
      success: true,
      status: 201,
      data: recordingData,
      message: "Recording created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
