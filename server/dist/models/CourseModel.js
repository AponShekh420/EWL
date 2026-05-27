"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
        type: String,
        required: true,
    },
    headline: { type: String },
    courseId: { type: String },
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
    speaker: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
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
    customMessage: { type: String },
    attachment: { type: String },
    checkoutPageMessage: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
}, { timestamps: true });
const courseModel = (0, mongoose_1.model)("Course", courseSchema);
exports.default = courseModel;
