"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxAndShipping = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "asfasdfasdasdf");
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
const getTaxAndShipping = async (req, res) => {
    try {
        const { cart, shippingAddress, shippingResultAndProducts, usps } = req.body;
        const TAX_CODE_MAP = {
            default: "txcd_99999999", // general goods
            menstrual: "txcd_32040005" // ✅ your special case
        };
        const line_items = cart.map((item, index) => {
            const tax_code = TAX_CODE_MAP[item.category] || TAX_CODE_MAP.default;
            return {
                amount: Math.round((item.price * item.qty) * 100),
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
        let shippingClassRates = [...shippingResultAndProducts.myShemenClassProducts, ...shippingResultAndProducts.ebookClassProducts, ...shippingResultAndProducts.onePointFiveLbClassProducts];
        res.json({
            shipping: {
                flatRate: shippingResultAndProducts.flatRate,
                localPickup: shippingResultAndProducts.localPickup,
                usps: usps,
                impossibleProducts: shippingResultAndProducts.impossibleProducts.map((p) => p._id),
                shippingClassRates: shippingClassRates,
            },
            tax: calculation.tax_amount_exclusive / 100,
            success: true,
            message: "Tax and shipping calculated successfully",
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
            // breakdown: calculation.tax_breakdown,
        });
    }
    catch (error) {
        console.error('Error fetching tax and shipping:', error);
        res.status(500).json({
            success: false,
            errors: {
                msg: 'Internal Server Error'
            }
        });
    }
};
exports.getTaxAndShipping = getTaxAndShipping;
