import { model, Schema } from "mongoose";

const ModuleSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    records: [{ type: Schema.Types.ObjectId, ref: "Recording", required: false }],
  },
  { timestamps: true },
);


export const ModuleModel = model("Module", ModuleSchema);
