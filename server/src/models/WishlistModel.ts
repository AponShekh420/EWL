import { model, Schema } from "mongoose";

const WishlistSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export const WishlistModel = model("Wishlist", WishlistSchema);
