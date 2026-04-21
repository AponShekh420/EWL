import { NextFunction, Request, response, Response } from "express";
import ShippingModel from "../models/ShippingModel";
import { error } from "console";
import productModel from "../models/ProductModel";



// {
//     "cart": [
//       { "_id":"sdfaasdfasdf", "name": "T-shirt", "price": 50, "qty": 2, "category": "menstrual", "weight": 3, "length": 3, "width": 5, "height": 2, "shippingClass": "my-shemen-class"},
//       { "_id":"fdassdafasd", "name": "T-shirt", "price": 50, "qty": 2, "category": "menstrual", "weight": 3, "length": 3, "width": 5, "height": 2, "shippingClass": "ebook-class"},
//       { "_id":"sdfaasdreterhrehfasdf", "name": "T-shirt", "price": 500, "qty": 2, "category": "menstrual", "weight": 3, "length": 3, "width": 5, "height": 2},
//       { "_id":"eyfbbfverbe", "name": "T-shirt", "price": 50, "qty": 2, "category": "menstrual", "weight": 0.4, "length": 3, "width": 5, "height": 2}
//     ],
//   "shippingAddress": {
//     "name": "fahim hoissain",
//     "line1": "88 RIDGE VIEW RD",
//     "city": "CHEYENNE",
//     "state": "WY",
//     "postal_code": "82001",
//     "country": "US"
//   }
// }

interface mixedItem {
    _id: string;
    name: string;
    price: number;
    qty: number;
    category: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    shippingClass?: string;
    shippingCost?: number; // for my-shemen-class items
}



const shippingClassRulseHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {shippingAddress, cart} = req.body;

    // const products = await productModel.find({
    //     _id: { $in: cart.map((item: { _id: string }) => item._id) }
    // });

    let flatRate;
    let localPickup = false;

    // these are classes name, if you need more class then extend variable and add logic in loop
    let myShemenClass: mixedItem[] = [];
    let ebookClass: mixedItem[] = [];
    // end


    let usps: mixedItem[] = [];

    let mixData: mixedItem[] = [];
    let others: mixedItem[] = [];


    const shippingZone = await ShippingModel.findOne({
        region: shippingAddress.country,
    });
    if (shippingZone) {
        const shippingMethods = shippingZone.shippingMethods;

        const methods = shippingMethods.map((method) => method.methodName);
        console.log("Shipping Methods for Zone:", methods);
        
        for (const method of shippingMethods) { 
            if (method.methodName === "flatRate" && method?.cost > 0) {
                flatRate = cart.filter((item: { qty: number, shippingClass: string }) => !methods.includes(item?.shippingClass)).reduce((acc: number, item: mixedItem) =>  (item.qty * method.cost) + acc, 0);
            } else if (method.methodName === "localPickup") {
                localPickup = true;
            }  else if (method.methodName === "my-shemen-class") {
                // ✅ your special class if you need more class then add else if and add logic in loop
                myShemenClass = cart
                .filter((item: { shippingClass: string }) => item.shippingClass === "my-shemen-class")
                .map((item: { qty: number, shippingClass: string }) => ({
                    ...item,
                    shippingCost: method.cost * item.qty
                }));
            } else if (method.methodName === "ebook-class") {
                // ✅ your special class if you need more class then add else if and add logic in loop
                ebookClass = cart
                .filter((item: { shippingClass: string }) => item.shippingClass === "ebook-class")
                .map((item: { qty: number, shippingClass: string }) => ({
                    ...item,
                    shippingCost: method.cost * item.qty
                }));
            } else if(method.methodName === "usps") {
            // 🔥 USPS logic (if needed)
                usps = cart.filter((item: { qty: number, shippingClass: string }) => {
                    if (!methods.includes(item?.shippingClass)) {
                        return {
                            ...item,
                        };
                    }
                });
            }
        }

        
        mixData = [...myShemenClass, ...usps, ...ebookClass];
        others = cart.filter((item1: { _id: string }) => {
            return !mixData.some((item2: { _id: string }) => item2._id === item1._id);
        });

        console.log("Shipping Zone:", shippingZone);
        console.log("Flat Rate:", flatRate);
        console.log("Local Pickup Available:", localPickup);
        console.log("My Shemen Class Items:", myShemenClass);
        console.log("USPS Items:", usps);
        console.log("Other Items:", others);
        console.log("Final Mix Data:", mixData);

        if(mixData.length === 0) {
            res.status(404).json({ error: "No valid shipping methods found for the items in the cart." });
        } else {
            req.body.shippingResultAndProducts = {
                flatRate,
                localPickup,
                uspsProducts: usps,
                impossibleProducts: others,
                myShemenClassProducts: myShemenClass,
                ebookClassProducts: ebookClass
            };
            next();
            // res.status(200).json({
            //     mixData,
            //     others,
            //     flatRate,
            //     localPickup,
            //     myShemenClass,
            //     ebookClass,       
            //     usps: usps,
            //     message: "Shipping methods determined based on shipping class rules."
            // });
        } 
    } else {
        const shippingWorldwide = await ShippingModel.findOne({
            region: "everywhere",
        });
        console.log("Worldwide Shipping Zone:");
        if(shippingWorldwide) {
            const shippingMethods = shippingWorldwide.shippingMethods;

            const methods = shippingMethods.map((method) => method.methodName);
            console.log("Shipping Methods for Zone:", methods);
            
            for (const method of shippingMethods) { 
                if (method.methodName === "Flat Rate" && method?.cost > 0) {
                    flatRate = cart.filter((item: { qty: number, shippingClass: string }) => !methods.includes(item?.shippingClass)).reduce((acc: number, item: mixedItem) =>  (item.qty * method.cost) + acc, 0);
                } else if (method.methodName === "Local Pickup") {
                    localPickup = true;
                } else if (method.methodName === "my-shemen-class") {
                    // ✅ your special case
                    myShemenClass = cart
                    .filter((item: { shippingClass: string }) => item.shippingClass === "my-shemen-class")
                    .map((item: { qty: number, shippingClass: string }) => ({
                        ...item,
                        shippingCost: method.cost * item.qty
                    }));
                } else if (method.methodName === "ebook-class") {
                    // ✅ your special case
                    ebookClass = cart
                    .filter((item: { shippingClass: string }) => item.shippingClass === "ebook-class")
                    .map((item: { qty: number, shippingClass: string }) => ({
                        ...item,
                        shippingCost: method.cost * item.qty
                    }));
                } else if(method.methodName === "usps") {
                    // 🔥 USPS logic (if needed)
                    console.log("USPS method found, applying to items without specific shipping class...");
                    usps = cart.filter((item: { qty: number, shippingClass: string }) => {
                        if (!methods.includes(item?.shippingClass)) {
                            return {
                                ...item,
                            };
                        }
                    });
                }
            }

            
            mixData = [...myShemenClass, ...usps, ...ebookClass];
            others = cart.filter((item1: { _id: string }) => {
                return !mixData.some((item2: { _id: string }) => item2._id === item1._id);
            });

            console.log("Shipping Zone:", shippingZone);
            console.log("Flat Rate:", flatRate);
            console.log("Local Pickup Available:", localPickup);
            console.log("My Shemen Class Items:", myShemenClass);
            console.log("USPS Items:", usps);
            console.log("Other Items:", others);
            console.log("Final Mix Data:", mixData);

            if(mixData.length === 0) {
                res.status(404).json({ error: "No valid shipping methods found for the items in the cart." });
            } else {
                req.body.shippingResultAndProducts = {
                    flatRate,
                    localPickup,
                    uspsProducts: usps,
                    impossibleProducts: others,
                    myShemenClassProducts: myShemenClass,
                    ebookClassProducts: ebookClass
                };
                next();
                // res.status(200).json({
                //     mixData,
                //     others,
                //     flatRate,
                //     localPickup,
                //     myShemenClass,
                //     ebookClass,       
                //     usps,
                //     message: "Shipping methods determined based on shipping class rules."
                // });
            }
        }
        // res.json({
        //     shipping: shippingWorldwide ? shippingWorldwide.shippingMethods : null,
        //     message: "No specific shipping zone found for this address, showing worldwide options if available."
        // });
    }

    // req.body.shippingClass = shippingZone;
    

}

export default shippingClassRulseHandler;