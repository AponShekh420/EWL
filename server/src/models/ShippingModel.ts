import { model, Schema } from "mongoose";

const shippingSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    zoneName: {
      type: String,

      required: true,
    },
    region: {
      type: String,

      required: true,
    },
    shippingMethods: [{ methodName: String, cost: Number }],
  },
  { timestamps: true },
);

const ShippingModel = model("Shipping", shippingSchema);

export default ShippingModel;
