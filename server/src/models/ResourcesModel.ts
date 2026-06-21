import { model, Schema } from "mongoose";

const ResourcesSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "draft", "publish"],
      default: "pending",
    },

    description: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ResourcesModel = model("Resources", ResourcesSchema);

export default ResourcesModel;
