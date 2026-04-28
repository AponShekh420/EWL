import dot from "dot-object";
import { Request, Response } from "express";
import { OrderModel } from "../../../models/OrderModel";
import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config();
const stripe=new Stripe(
 process.env.STRIPE_SECRET_KEY!
);

const createOrder = async(req: Request,res: Response) =>{
  try{
    const body = req.body;
    const {subtotal, tax, shipping, shippingClassRates} = body
    const latestOrder = await OrderModel.findOne().sort({ orderId: -1 }).exec();

    // const subtotal=
    // products.reduce(
    // (sum,item)=>
    // sum+(item.price*item.qty),
    // 0
    // );
    const totalPrice = Number(subtotal) + (Number(tax)) + Number(shipping.cost) + Number(shippingClassRates.reduce((total: any, rate: { shippingCost: any; }) => total + rate.shippingCost, 0))

    const createdOrder = await OrderModel.create({
      ...body,
      customer: req?.user && req?.user?._id,
      totalPrice: totalPrice,
      orderId: latestOrder ? latestOrder.orderId + 1 : 100,
    });
    const paymentIntent= await stripe.paymentIntents.create({
        amount:Math.round(totalPrice*100),
        currency:"usd",
        description:`Order #${createdOrder.orderId}`,
        metadata:{
          orderId:createdOrder._id.toString()
        }
    });


    createdOrder.stripePaymentIntentId= paymentIntent.id;

    await createdOrder.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId:createdOrder._id,
      success: true,
      message: "Order created successfully",
    });
  }

  catch(err){
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      success: false,
      error: message
    });
  }

};
export default createOrder;