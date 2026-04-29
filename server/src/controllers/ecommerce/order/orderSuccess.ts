import { Request, Response } from "express";
import { OrderModel } from "../../../models/OrderModel";
import dotenv from "dotenv"
dotenv.config()

const orderSuccess = (req: Request,res: Response)=>{
    console.log("The success has called")
    const stripe=require("stripe")(
    process.env.STRIPE_SECRET_KEY
    );

    const event=
    stripe.webhooks.constructEvent(
    req.body,
    req.headers["stripe-signature"],
    process.env.STRIPE_WEBHOOK_SECRET
    );


    if(
    event.type==="payment_intent.succeeded"
    ){

    const paymentIntent=
    event.data.object;

    const orderId=
    paymentIntent.metadata.orderId;

    OrderModel.findByIdAndUpdate(
    orderId,
    {
    paymentStatus:"paid",
    status:"processing"
    }
    ).exec();

    }

    res.json({received:true});
};


export default orderSuccess;

