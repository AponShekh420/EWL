import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded"],
      default: "pending",
    },
    totalProduct: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    oderNote: {
      type: String,
    },

    billingInfo: {
      customerName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
    },
    shippingInfo: {
      customerName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
    },
    paymentInfo: {
      paymentMethod: {
        type: String,
        required: true,
      },
      shippingMethod: {
        type: String,
        required: true,
      },
      oderDate: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export const OrderModel = model("Order", orderSchema);
