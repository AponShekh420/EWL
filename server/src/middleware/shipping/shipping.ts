// routes/shipping.js
import { NextFunction, Request, Response } from "express";
import { expandCart } from "../../utils/expandCart";
import { getTotalWeight } from "../../utils/calcWeight";
import { findBestBoxForCart } from "../../helpers/boxSelector";
import client from "../../lib/shippo";
import { AddressCreateRequest } from "shippo/models/components/addresscreaterequest";
import { DistanceUnitEnum, WeightUnitEnum } from "shippo";


const shipping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shippingResultAndProducts, shippingAddress } = req.body;

    if(!shippingResultAndProducts.uspsProducts || shippingResultAndProducts.uspsProducts.length === 0) {
        next();
        return;
    }

    // 1. expand cart
    const items = expandCart(shippingResultAndProducts.uspsProducts);

    // 2. total weight (lbs)
    const totalWeight = getTotalWeight(items);

    // 3. find best box
    const result = await findBestBoxForCart(items);

    let parcel: any;
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
        distanceUnit: DistanceUnitEnum.In,
        weight: weightOz,
        massUnit: WeightUnitEnum.Oz
      };

    } else {

      const weightOz = (totalWeight * 16).toFixed(2);
      // 🔥 fallback parcel (NO BOX MATCH)
      parcel = {
        length: "12",
        width: "10",
        height: "5",
        distanceUnit: DistanceUnitEnum.In,
        weight: weightOz,
        massUnit: WeightUnitEnum.Oz
      };
    }


    const addressFrom: AddressCreateRequest  = {
      name: "Ohel Miriam Inc.",
      street1: "5 IMPERIAL LN",
      city: "SPRING VALLEY",
      state: "NY",
      zip: "10977-7215",
      country: "US"
    };

    const addressTo: AddressCreateRequest = {
      name: shippingAddress?.name || "Anonymous",
      street1: shippingAddress.line1,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.postal_code,
      country: shippingAddress.country || "US",
    };


    // 6. create shipment
    const shipment = await client.shipments.create({
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

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    res.status(500).json({
      success: false,
      errors: {
        msg: message
      }
    });
  }
};

export default shipping;