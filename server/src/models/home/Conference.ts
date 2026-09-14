import { Schema, model, Document } from 'mongoose';

export interface IConference extends Document {
  month: string;        // e.g., "May"
  day: string;          // e.g., "12"
  timeInfo: string;     // e.g., "Tuesday 3 pm EST"
  speaker: string;      // e.g., "Sarah Kahan"
  lecture: string;      // e.g., "Q&A Session with Sarah Kahan LCSW"
  readMoreUrl?: string; // Optional custom link for "Read More" button
  createdAt?: Date;
  updatedAt?: Date;
  eventDate: Date;      // e.g., "2026-05-12T15:00:00-05:00" for Countdown
}

const ConferenceSchema = new Schema<IConference>(
  {
  month: { type: String, required: true },
  day: { type: String, required: true },
  timeInfo: { type: String, required: true },
  eventDate: { type: Date, required: true }, // e.g., "2026-05-12T15:00:00-05:00"
  speaker: { type: String, required: true },
  lecture: { type: String, required: true },
  readMoreUrl: { type: String, default: '#' },
  },
  { timestamps: true }
);

export const Conference = model<IConference>('Conference', ConferenceSchema);