"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassOrderModel = void 0;
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class",
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
});
const orderSchema = new mongoose_1.Schema({
    orderId: {
        type: Number,
        required: true,
    },
    classes: {
        type: [classSchema],
        required: true,
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled", "refunded", "processing", "Failed"],
        default: "pending",
    },
    totalClass: {
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
}, { timestamps: true });
exports.ClassOrderModel = (0, mongoose_1.model)("Class-Order", orderSchema);
