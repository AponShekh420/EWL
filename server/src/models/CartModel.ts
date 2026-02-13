import { model, Schema } from "mongoose";

const CartSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalProduct: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

CartSchema.pre("save", function (next) {
  this.totalProduct = this.items.length;

  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  next();
});
export const CartModel = model("Cart", CartSchema);
