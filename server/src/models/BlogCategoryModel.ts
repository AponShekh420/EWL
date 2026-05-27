import { model, Schema } from "mongoose";

const categorySchema = new Schema(
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
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    subcategory: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
  },
  { timestamps: true },
);

export const BlogCategoryModel = model("BlogCategory", categorySchema);
export const BlogSubCategoryModel = model("BlogSubCategory", subCategorySchema);
