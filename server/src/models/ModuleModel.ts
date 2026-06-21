import { model, Schema } from "mongoose";

const ModuleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    records: [{ type: Schema.Types.ObjectId, ref: "Recording", required: false }],
  },
  { timestamps: true },
);


export const ModuleModel = model("Module", ModuleSchema);
