"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
CartSchema.pre("save", function (next) {
    this.totalProduct = this.items.length;
    this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    next();
});
exports.CartModel = (0, mongoose_1.model)("Cart", CartSchema);
