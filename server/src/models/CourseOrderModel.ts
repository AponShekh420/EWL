import { model, Schema } from "mongoose";

const ModuleSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  id: {type: String, required: true}
  // Add any other fields you expect in the object here
}, { _id: false }); // Prevents Mongoose from auto-generating an _id for every module

const PackageSchema = new Schema({
  modules: [ModuleSchema], 
  date: {
    type: Date,
    default: Date.now
  },
  packagePrice: Number,
}, { _id: false });

const courseSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Course",
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
    courses: {
      type: [courseSchema],
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded", "processing", "failed"],
      default: "pending",
    },
    totalCourse: {
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
    orderNotes: {
      type: String,
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
    fullName: {
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
    modules: [ModuleSchema],
    packages: [PackageSchema]
  },
  { timestamps: true },
);

export const CourseOrderModel = model("Course-Order", orderSchema);
