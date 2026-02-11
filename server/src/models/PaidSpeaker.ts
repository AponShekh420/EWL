import mongoose, { Schema } from "mongoose";

const paidSpeakerSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
  },
  { timestamps: true },
);

export const PaidSpeakerModel = mongoose.model(
  "PaidSpeaker",
  paidSpeakerSchema,
);
