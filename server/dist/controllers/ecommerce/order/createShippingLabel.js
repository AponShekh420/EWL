"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderModel_1 = require("../../../models/OrderModel");
const shippo_1 = __importDefault(require("../../../lib/shippo"));
const createShippingLabel = async (req, res) => {
    try {
        const order = await OrderModel_1.OrderModel.findById(req.params.id);
        if (!order || !order.shipping) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        if (!order.shipping.rateId) {
            return res.status(400).json({
                success: false,
                message: "Shipping rate ID not found"
            });
        }
        // Create label transaction
        let transaction = await shippo_1.default.transactions.create({
            rate: order.shipping.rateId,
            labelFileType: "PDF"
        });
        console.log("Initial transaction:", transaction);
        /**
         * Shippo sometimes returns QUEUED.
         * Wait and check until the label is ready.
         */
        let attempts = 0;
        const maxAttempts = 5;
        while (transaction.status === "QUEUED" &&
            attempts < maxAttempts) {
            attempts++;
            // wait 5 seconds
            await new Promise(resolve => setTimeout(resolve, 5000));
            transaction =
                await shippo_1.default.transactions.get(transaction.objectId);
            console.log(`Transaction attempt ${attempts}:`, {
                status: transaction.status,
                messages: transaction.messages,
                fullTransaction: transaction
            });
        }
        // Label created successfully
        if (transaction.status === "SUCCESS") {
            order.shipping.transactionId =
                transaction.objectId || "";
            order.shipping.trackingNumber =
                transaction.trackingNumber || "";
            order.shipping.labelUrl =
                transaction.labelUrl || "";
            order.shipping.status =
                "label_created";
            await order.save();
            return res.json({
                success: true,
                message: "Shipping label created successfully",
                shipping: {
                    transactionId: transaction.objectId,
                    trackingNumber: transaction.trackingNumber,
                    labelUrl: transaction.labelUrl
                }
            });
        }
        // Failed after waiting
        return res.status(400).json({
            success: false,
            message: "Shipping label generation failed",
            status: transaction.status,
            error: transaction.messages || []
        });
    }
    catch (error) {
        console.log("Create label error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};
exports.default = createShippingLabel;
