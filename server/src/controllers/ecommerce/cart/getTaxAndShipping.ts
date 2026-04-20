import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "asdfasdfasdf");



// you have to send this example data to you request body:
// {
//     "cart": [
//       { "name": "T-shirt", "price": 50, "qty": 2, "category": "menstrual" },
//       { "name": "T-shirt", "price": 50, "qty": 2, "category": "menstrual" },
//       { "name": "Book", "price": 200, "qty": 1, "category": "sadfasd" }
//     ],
//   "shippingAddress": {
//     "line1": "88 RIDGE VIEW RD",
//     "city": "CHEYENNE",
//     "state": "WY",
//     "postal_code": "82001",
//     "country": "US"
//   }
// }


export const getTaxAndShipping = async (req: Request, res: Response) => {
  try {
    const { cart, shippingAddress, shippingResult } = req.body;
    
    const TAX_CODE_MAP: Record<string, string> = {
      default: "txcd_99999999",        // general goods
      menstrual: "txcd_32040005"       // ✅ your special case
    };

    const line_items = cart.map((item: { price: number; qty: number, name: string, category: string }, index: number) => {
    const tax_code =
      TAX_CODE_MAP[item.category] || TAX_CODE_MAP.default;

    return {
        amount: Math.round(item.price * 100),
        quantity: item.qty,
        reference: item.name + index || `product_${index}`,
        tax_code
      };
    });

    const shippingAddressWithoutName = {
      line1: shippingAddress.line1,
      city: shippingAddress.city,
      state: shippingAddress.state,
      postal_code: shippingAddress.postal_code,
      country: shippingAddress.country
    };
    
    const calculation = await stripe.tax.calculations.create({
        currency: "usd",
        line_items,
        customer_details: {
        address: shippingAddressWithoutName,
        address_source: "shipping"
        }
    });

    res.json({
        shipping: shippingResult || null,
        tax: calculation.tax_amount_exclusive / 100,
        // shipping: {
        //   flatRate: 20,
        //   localPickup: 0,
        //   usps: {
        //     prices: [
        //       {
        //         service: "PRIORITY_MAIL",
        //         price: 8.50
        //       },
        //       {
        //         service: "EXPRESS_MAIL",
        //         price: 5.50
        //       }
        //     ]
        //   }
        // },
        // breakdown: calculation
    });
  } catch (error) {
    console.error('Error fetching tax and shipping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}