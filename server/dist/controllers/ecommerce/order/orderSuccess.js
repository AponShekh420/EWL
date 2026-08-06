"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderModel_1 = require("../../../models/OrderModel");
const dotenv_1 = __importDefault(require("dotenv"));
const ProductOrderEmail_1 = __importDefault(require("../../../emails/ProductOrderEmail"));
dotenv_1.default.config();
const orderSuccess = async (req, res) => {
    console.log("The success has called");
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(req.body, req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        const createdOrder = await OrderModel_1.OrderModel.findByIdAndUpdate(orderId, {
            paymentStatus: "paid",
            status: "processing"
        }, {
            new: true
        }).populate([
            {
                path: "customer",
            },
            {
                path: "products._id",
            },
        ]).exec();
        await (0, ProductOrderEmail_1.default)(createdOrder);
    }
    res.json({ received: true });
};
exports.default = orderSuccess;
