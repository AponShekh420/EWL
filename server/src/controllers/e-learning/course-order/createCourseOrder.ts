import dot from "dot-object";
import { Request, Response } from "express";
import { OrderModel } from "../../../models/OrderModel";
import Stripe from "stripe"
import dotenv from "dotenv"
import { CourseOrderModel } from "../../../models/CourseOrderModel";
dotenv.config();
const stripe=new Stripe(
 process.env.STRIPE_SECRET_KEY!
);

const createCourseOrder = async(req: Request,res: Response) =>{
  try{
    const body = req.body;
    const {subtotal, modules, orderId} = body
    const latestOrder = await CourseOrderModel.findOne().sort({ orderId: -1 }).exec();

    // const subtotal=
    // products.reduce(
    // (sum,item)=>
    // sum+(item.price*item.qty),
    // 0
    // );
    const totalPrice = Number(subtotal);

    let createdOrder;

   if (orderId) {
      const existingOrder = await CourseOrderModel.findOne({ _id: orderId });
      
      if (existingOrder) {
        existingOrder.totalPrice += totalPrice;
        existingOrder.subtotal += totalPrice;
        
        // Safely push the new modules into the existing Mongoose DocumentArray
        if (modules && modules.length > 0) {
          existingOrder.modules.push(...modules);
          existingOrder.packages.push({
            modules: modules,
            date: Date.now(),
            packagePrice: totalPrice,
          })
        }
        
        createdOrder = existingOrder;
      } else {
        createdOrder = await CourseOrderModel.create({
          ...body,
          customer: req?.user && req?.user?._id,
          totalPrice: totalPrice,
          orderId: latestOrder ? latestOrder.orderId + 1 : 100,
          packages: modules.length > 0 ? [
            {
              modules: modules,
              date: Date.now(),
              packagePrice: totalPrice,
            }
          ]: []
        });
      }
    } else {
      createdOrder = await CourseOrderModel.create({
        ...body,
        customer: req?.user && req?.user?._id,
        totalPrice: totalPrice,
        orderId: latestOrder ? latestOrder.orderId + 1 : 100,
        packages: modules.length > 0 ? [
          {
            modules: modules,
            date: Date.now(),
            packagePrice: totalPrice,
          }
        ]: []
      });
    }


    const paymentIntent= await stripe.paymentIntents.create({
        amount:Math.round(totalPrice*100),
        currency:"usd",
        description:`Course Order #${createdOrder.orderId}`,
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
export default createCourseOrder;