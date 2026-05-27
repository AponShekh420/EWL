"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const createCourseOrder = async (req, res) => {
    try {
        const body = req.body;
        const { subtotal } = body;
        const latestOrder = await CourseOrderModel_1.CourseOrderModel.findOne().sort({ orderId: -1 }).exec();
        // const subtotal=
        // products.reduce(
        // (sum,item)=>
        // sum+(item.price*item.qty),
        // 0
        // );
        const totalPrice = Number(subtotal);
        const createdOrder = await CourseOrderModel_1.CourseOrderModel.create({
            ...body,
            customer: req?.user && req?.user?._id,
            totalPrice: totalPrice,
            orderId: latestOrder ? latestOrder.orderId + 1 : 100,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalPrice * 100),
            currency: "usd",
            description: `Course Order #${createdOrder.orderId}`,
            metadata: {
                orderId: createdOrder._id.toString()
            }
        });
        createdOrder.stripePaymentIntentId = paymentIntent.id;
        await createdOrder.save();
        res.json({
            clientSecret: paymentIntent.client_secret,
            orderId: createdOrder._id,
            success: true,
            message: "Order created successfully",
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            success: false,
            error: message
        });
    }
};
exports.default = createCourseOrder;
