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
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
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
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

export const CategoryModel = model("Category", categorySchema);
export const SubCategoryModel = model("SubCategory", subCategorySchema);
