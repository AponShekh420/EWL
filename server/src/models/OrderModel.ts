import { model, Schema } from "mongoose";


const differentBillingAddressSchema = new Schema({
  firstName: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  lastName: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  email: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  spouseName: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  phoneNumber: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  otherPhoneNumber: {
    type: String,
  },
  country: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  state: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  city: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  zip: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  streetAddress: {
    type: String,
    required: function () {
        return this.isDifferentBillingAddress === true;
      },
  },
  apartment: {
    type: String,
  }
})


const shippingClassRateSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const shippingSchema = new Schema(
  {
    methodName: {
      type: String,
      default: "",
    },
    cost: {
      type: Number,
      default: 0,
    },
    boxUsed: {
      type: String,
      default: "",
    },
    finalWeightOz: {
      type: Number,
      default: 0,
    },
    servicelevel: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
);

const orderSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: true,
    },
    products: {
      type: [productSchema],
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded", "processing", "Failed"],
      default: "pending",
    },
    totalProduct: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true
    },
    shipping: {
      type: shippingSchema,
      default: () => ({}),
    },
    orderNotes: {
      type: String,
    },
    shippingClassRates: {
      type: [shippingClassRateSchema],
      default: [],
    },
    tax: {
      type: String,
      default: 0
    },
    stripePaymentIntentId: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    isDifferentBillingAddress: {
      type: Boolean,
      default: false,
    },
    differentBillingAddress: {
      type: differentBillingAddressSchema,
      default: () => ({}),
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    spouseName: {
      type: String,
      required: true,
    },
    howDidYouHearAboutUs: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    otherPhoneNumber: {
      type: String,
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
    apartment: {
      type: String,
    },
  },
  { timestamps: true },
);

export const OrderModel = model("Order", orderSchema);
