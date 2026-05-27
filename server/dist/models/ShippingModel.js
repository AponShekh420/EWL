"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shippingSchema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    shippingMethods: [
        {
            methodName: {
                type: String,
                required: true,
            },
            cost: {
                type: Number,
                required: true,
            }
        }
    ],
}, { timestamps: true });
const ShippingModel = (0, mongoose_1.model)("Shipping", shippingSchema);
exports.default = ShippingModel;
