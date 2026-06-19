import { model, Schema } from "mongoose";

const ResourceCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    resources: [{ type: Schema.Types.ObjectId, ref: "Resources" }],
  },
  { timestamps: true },
);

export const ResourceCategoryModel = model(
  "ResourceCategory",
  ResourceCategorySchema,
);
