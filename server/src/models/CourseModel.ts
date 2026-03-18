import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    headline: { type: String },
    bio: { type: String },
    slug: { type: String, required: true },
    time: { type: String },
    lectures: { type: String },
    duration: { type: String },
    date: { type: String },
    aboutTab: { type: String },
    overviewTab: { type: String },
    courseTopicsTab: { type: String },
    speakerProfileTab: { type: String },
    testimonialsTab: { type: String },
    FAQsTab: { type: String },
    moreInfoTab: { type: String },
    students: { type: Number, required: true, default: 0 },
    speaker: { type: Schema.Types.ObjectId, ref: "User", required: true },
    externalLink: { type: String },
    offline: { type: Boolean, required: true },
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "couples"],
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["pending", "draft", "publish"],
      default: "publish",
    },
    
    thumbnail: {
      type: String,
      required: true,
    },
    installmentMonths: { type: Number },
    module: { type: Number },
    price: { type: Number, required: true },
    customMessage: { type: String},
    attachment: { type: String },
    checkoutPageMessage: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

const courseModel = model("Course", courseSchema);

export default courseModel;