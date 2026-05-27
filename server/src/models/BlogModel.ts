import { model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
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
    metaTitle: { type: String, required: false },
    metaSlug: { type: String, required: false },
    metaDescription: { type: String, required: false },
  },
  { timestamps: true },
);

const blogModel = model("Blog", blogSchema);

export default blogModel;
