import { Schema, model, Document } from 'mongoose';

export interface ICounter extends Document {
  couples: number;
  courses: number;
  speakers: number;
  lectures: number;
}

const counterSchema = new Schema<ICounter>(
  {
    couples: { type: Number, default: 6000 },
    courses: { type: Number, default: 15 },
    speakers: { type: Number, default: 45 },
    lectures: { type: Number, default: 90 },
  },
  { timestamps: true }
);

export const CounterModel = model<ICounter>('Counter', counterSchema);