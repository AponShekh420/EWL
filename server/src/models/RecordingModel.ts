import { model, Schema } from "mongoose";

const recordingSchema = new Schema(
  {
    speaker: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    class: { type: Schema.Types.ObjectId, ref: "Class" },
    heading: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    recordingCategory: {
      type: String,
      enum: ["free", "class", "course", "course-demo"],
      required: true,
    },
    recordings: [
      {
        id: String,
        recordNumber: { type: Number, required: true },
        file: { type: String, required: false },
        sourceType: {
          type: String,
          enum: ["internal", "external"],
          required: true,
        },
        mediaType: { type: String, enum: ["audio", "video"], required: true },
        externalLink: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const RecordingModel = model("Recording", recordingSchema);

export default RecordingModel;
