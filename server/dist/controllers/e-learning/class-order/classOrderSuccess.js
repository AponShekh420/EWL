"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ClassOrderModel_1 = require("../../../models/ClassOrderModel");
const ClassOrderEmail_1 = __importDefault(require("../../../emails/ClassOrderEmail"));
dotenv_1.default.config();
const classOrderSuccess = async (req, res) => {
    console.log("The success has called");
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(req.body, req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET_CLASS);
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        const createdOrder = await ClassOrderModel_1.ClassOrderModel.findByIdAndUpdate(orderId, {
            paymentStatus: "paid",
            status: "processing"
        }, {
            new: true
        }).populate([
            {
                path: "customer",
            },
            {
                path: "classes._id",
            },
        ]).exec();
        await (0, ClassOrderEmail_1.default)(createdOrder);
    }
    res.json({ received: true });
};
exports.default = classOrderSuccess;
