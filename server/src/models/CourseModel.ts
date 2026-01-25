import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    time: { type: String, required: true },
    lectures: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true },
    aboutTab: { type: String, required: true },
    overviewTab: { type: String, required: true },
    courseTopicsTab: { type: String, required: true },
    speakerProfileTab: { type: String, required: true },
    FAQsTab: { type: String, required: true },
    moreInfoTab: { type: String, required: true },
    students: { type: Number, required: true },
    speaker: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ExternalLink: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "couples"],
    },
    status: {
      type: String,
      enum: ["pending", "draft", "publish"],
      default: "pending",
    },
    
    thumbnail: {
      type: String,
      required: true,
    },
    regularPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    limitOneItemPerOrder: { type: Boolean, required: true },
    customMessage: { type: String, required: true },
    attachment: { type: String, required: true },
    checkoutPageMessage: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const courseModel = model("Course", courseSchema);

export default courseModel;