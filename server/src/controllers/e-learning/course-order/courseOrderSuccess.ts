import { Request, Response } from "express";
import dotenv from "dotenv"
import { CourseOrderModel } from "../../../models/CourseOrderModel";
import CourseOrderEmail from "../../../emails/CourseOrderEmail";
dotenv.config()

const courseOrderSuccess = async (req: Request,res: Response)=>{
    console.log("The success has called")
    const stripe=require("stripe")(
    process.env.STRIPE_SECRET_KEY
    );

    const event=
    stripe.webhooks.constructEvent(
    req.body,
    req.headers["stripe-signature"],
    process.env.STRIPE_WEBHOOK_SECRET_COURSE
    );


    if(
    event.type==="payment_intent.succeeded"
    ){

    const paymentIntent=
    event.data.object;

    const orderId=
    paymentIntent.metadata.orderId;

    const createdOrder = await CourseOrderModel.findByIdAndUpdate(
    orderId,
    {
    paymentStatus:"paid",
    status:"processing"
    },
    {
      new:true
    }
    ).populate([
      {
        path: "customer",
      },
      {
        path: "courses._id",
      },
    ]).exec();
    await CourseOrderEmail(createdOrder);
    }

    res.json({received:true});
};


export default courseOrderSuccess;

