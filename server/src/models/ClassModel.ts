import { model, Schema } from "mongoose";

const classSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    
    contentOne: { type: String },
    contentTwo: { type: String },
    audiosOne: [{ type: String, required: true }],
    audiosTwo: [{ type: String, required: true }],
    videosOne: [{ type: String, required: true }],
    videosTwo: [{ type: String, required: true }],

    speaker: { type: Schema.Types.ObjectId, ref: "User", required: true },
    externalLink: { type: String },
    offline: { type: Boolean, required: true },
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "couples"],
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["pending", "draft", "publish"],
      default: "publish",
    },
    
    thumbnail: {
      type: String,
      required: true,
    },
    installmentMonths: { type: Number },
    module: { type: Number },
    price: { type: Number, required: true },
    customMessage: { type: String},
    attachment: { type: String },
    checkoutPageMessage: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

const classModel = model("Class", classSchema);

export default classModel;