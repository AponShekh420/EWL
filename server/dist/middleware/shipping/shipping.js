"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expandCart_1 = require("../../utils/expandCart");
const calcWeight_1 = require("../../utils/calcWeight");
const boxSelector_1 = require("../../helpers/boxSelector");
const shippo_1 = __importDefault(require("../../lib/shippo"));
const shippo_2 = require("shippo");
const shipping = async (req, res, next) => {
    try {
        const { shippingResultAndProducts, shippingAddress } = req.body;
        if (!shippingResultAndProducts.uspsProducts || shippingResultAndProducts.uspsProducts.length === 0) {
            next();
            return;
        }
        // 1. expand cart
        const items = (0, expandCart_1.expandCart)(shippingResultAndProducts.uspsProducts);
        // 2. total weight (lbs)
        const totalWeight = (0, calcWeight_1.getTotalWeight)(items);
        // 3. find best box
        const result = await (0, boxSelector_1.findBestBoxForCart)(items);
        let parcel;
        let finalWeightLbs;
        if (result?.type === "BOX") {
            const box = result.box;
            finalWeightLbs = totalWeight + box.emptyWeight;
            // ✅ FIX: round weight (VERY IMPORTANT)
            const weightOz = (finalWeightLbs * 16).toFixed(2);
            parcel = {
                length: box.dimensions.length.toString(),
                width: box.dimensions.width.toString(),
                height: box.dimensions.height.toString(),
                distanceUnit: shippo_2.DistanceUnitEnum.In,
                weight: weightOz,
                massUnit: shippo_2.WeightUnitEnum.Oz
            };
        }
        else {
            const weightOz = (totalWeight * 16).toFixed(2);
            // 🔥 fallback parcel (NO BOX MATCH)
            parcel = {
                length: "12",
                width: "10",
                height: "5",
                distanceUnit: shippo_2.DistanceUnitEnum.In,
                weight: weightOz,
                massUnit: shippo_2.WeightUnitEnum.Oz
            };
        }
        const addressFrom = {
            name: "Ohel Miriam Inc.",
            street1: "5 IMPERIAL LN",
            city: "SPRING VALLEY",
            state: "NY",
            zip: "10977-7215",
            country: "US"
        };
        const addressTo = {
            name: shippingAddress?.name || "Anonymous",
            street1: shippingAddress.line1,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zip: shippingAddress.postal_code,
            country: shippingAddress.country || "US",
        };
        // 6. create shipment
        const shipment = await shippo_1.default.shipments.create({
            addressFrom: addressFrom,
            addressTo: addressTo,
            parcels: [
                parcel
            ],
            async: false
        });
        req.body.usps = {
            success: true,
            boxUsed: result?.box?.name || "CUSTOM PARCEL",
            finalWeightOz: finalWeightLbs || (totalWeight * 16).toFixed(2),
            rates: shipment.rates
        };
        next();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            success: false,
            errors: {
                msg: message
            }
        });
    }
};
exports.default = shipping;
