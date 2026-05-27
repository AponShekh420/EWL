"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShippingModel_1 = __importDefault(require("../models/ShippingModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const shippingClassRulseHandler = async (req, res, next) => {
    const { shippingAddress, products } = req.body;
    const dbProducts = await ProductModel_1.default.find({
        _id: { $in: products.map((item) => item._id) }
    });
    const cart = products.map((item) => {
        const product = dbProducts.find((p) => p._id.toString() === item._id);
        if (product) {
            return {
                ...item,
                qty: item.quantity, // Use quantity from request or fallback to qty
                weight: Number(product.weight),
                length: Number(product.dimensionLength),
                width: Number(product.dimensionWidth),
                height: Number(product.dimensionHeight),
                price: Number(product.salePrice),
                shippingClass: product.shippingClass,
                category: product.category,
                name: product.title
            };
        }
        else {
            // Handle case where product is not found (optional)
            console.error(`Product with ID ${item._id} not found.`);
            return item; // or you could choose to exclude it from the cart
        }
    });
    req.body.cart = cart; // Add enriched cart to request body for downstream middleware/controllers
    let flatRate;
    let localPickup = false;
    // these are classes name, if you need more class then extend variable and add logic in loop
    let myShemenClass = [];
    let ebookClass = [];
    let onePointFiveLbClass = [];
    // end
    let usps = [];
    let mixData = [];
    let others = [];
    const shippingZone = await ShippingModel_1.default.findOne({
        region: shippingAddress.country,
    });
    if (shippingZone) {
        const shippingMethods = shippingZone.shippingMethods;
        const methods = shippingMethods.map((method) => method.methodName);
        console.log("Shipping Methods for Zone:", methods);
        for (const method of shippingMethods) {
            if (method.methodName === "flat-rate" && method?.cost > 0) {
                flatRate = cart.filter((item) => !methods.includes(item?.shippingClass)).reduce((acc, item) => (item.qty * method.cost) + acc, 0);
            }
            else if (method.methodName === "local-pickup") {
                localPickup = true;
            }
            else if (method.methodName === "my-shemen-class") {
                // ✅ your special class if you need more class then add else if and add logic in loop
                myShemenClass = cart
                    .filter((item) => item.shippingClass === "my-shemen-class")
                    .map((item) => ({
                    ...item,
                    shippingCost: shippingZone.region === "IL" ? ((method.cost) + (item.qty * 2)) : (shippingZone.region === "GB" ? ((method.cost) + (item.qty * 10)) : method.cost * item.qty),
                }));
            }
            else if (method.methodName === "1.5-lb-class") {
                // ✅ your special class if you need more class then add else if and add logic in loop
                onePointFiveLbClass = cart
                    .filter((item) => item.shippingClass === "1.5-lb-class")
                    .map((item) => ({
                    ...item,
                    shippingCost: method.cost * item.qty
                }));
            }
            else if (method.methodName === "ebook-class") {
                // ✅ your special class if you need more class then add else if and add logic in loop
                ebookClass = cart
                    .filter((item) => item.shippingClass === "ebook-class")
                    .map((item) => ({
                    ...item,
                    shippingCost: method.cost * item.qty
                }));
            }
            else if (method.methodName === "usps") {
                // 🔥 USPS logic (if needed)
                usps = cart.filter((item) => {
                    if (!methods.includes(item?.shippingClass)) {
                        return {
                            ...item,
                        };
                    }
                });
            }
        }
        mixData = [...myShemenClass, ...usps, ...ebookClass, ...onePointFiveLbClass];
        others = cart.filter((item1) => {
            return !mixData.some((item2) => item2._id === item1._id);
        });
        if (mixData.length === 0) {
            res.status(404).json({ error: "No valid shipping methods found for the items in the cart." });
        }
        else {
            req.body.shippingResultAndProducts = {
                flatRate,
                localPickup,
                uspsProducts: usps,
                impossibleProducts: others,
                myShemenClassProducts: myShemenClass,
                ebookClassProducts: ebookClass,
                onePointFiveLbClassProducts: onePointFiveLbClass
            };
            next();
        }
    }
    else {
        const shippingWorldwide = await ShippingModel_1.default.findOne({
            region: "everywhere",
        });
        console.log("Worldwide Shipping Zone:");
        if (shippingWorldwide) {
            const shippingMethods = shippingWorldwide.shippingMethods;
            const methods = shippingMethods.map((method) => method.methodName);
            console.log("Shipping Methods for Zone:", methods);
            for (const method of shippingMethods) {
                if (method.methodName === "flat-rate" && method?.cost > 0) {
                    flatRate = cart.filter((item) => !methods.includes(item?.shippingClass)).reduce((acc, item) => (item.qty * method.cost) + acc, 0);
                }
                else if (method.methodName === "local-pickup") {
                    localPickup = true;
                }
                else if (method.methodName === "my-shemen-class") {
                    // ✅ your special case
                    myShemenClass = cart
                        .filter((item) => item.shippingClass === "my-shemen-class")
                        .map((item) => ({
                        ...item,
                        shippingCost: shippingWorldwide.region === "IL" ? ((method.cost) + (item.qty * 2)) : (shippingWorldwide.region === "GB" ? ((method.cost) + (item.qty * 10)) : method.cost * item.qty),
                    }));
                }
                else if (method.methodName === "1.5-lb-class") {
                    // ✅ your special case
                    onePointFiveLbClass = cart
                        .filter((item) => item.shippingClass === "1.5-lb-class")
                        .map((item) => ({
                        ...item,
                        shippingCost: method.cost * item.qty
                    }));
                }
                else if (method.methodName === "ebook-class") {
                    // ✅ your special case
                    ebookClass = cart
                        .filter((item) => item.shippingClass === "ebook-class")
                        .map((item) => ({
                        ...item,
                        shippingCost: method.cost * item.qty
                    }));
                }
                else if (method.methodName === "usps") {
                    // 🔥 USPS logic (if needed)
                    console.log("USPS method found, applying to items without specific shipping class...");
                    usps = cart.filter((item) => {
                        if (!methods.includes(item?.shippingClass)) {
                            return {
                                ...item,
                            };
                        }
                    });
                }
            }
            mixData = [...myShemenClass, ...usps, ...ebookClass, ...onePointFiveLbClass];
            others = cart.filter((item1) => {
                return !mixData.some((item2) => item2._id === item1._id);
            });
            if (mixData.length === 0) {
                res.status(404).json({
                    success: false,
                    errors: {
                        msg: "No valid shipping methods found for the items in the cart."
                    }
                });
            }
            else {
                req.body.shippingResultAndProducts = {
                    flatRate,
                    localPickup,
                    uspsProducts: usps,
                    impossibleProducts: others,
                    myShemenClassProducts: myShemenClass,
                    ebookClassProducts: ebookClass,
                    onePointFiveLbClassProducts: onePointFiveLbClass
                };
                next();
            }
        }
    }
};
exports.default = shippingClassRulseHandler;
