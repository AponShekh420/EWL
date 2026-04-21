// services/boxSelector.js

import UspsBoxModel from "../models/UspsBoxModel";

export const findBestBoxForCart = async (items: { weight: number }[]) => {

  const boxes = await UspsBoxModel.find({ isActive: true });
  // console.log("Available boxes:", boxes);
    if (!boxes.length) {
    return null; // no boxes configured
  }

  const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);

  const sorted = boxes?.sort((a, b) => (a?.maxWeight || 0) - (b?.maxWeight || 0));

  // ✅ 1. perfect match
  for (let box of sorted) {
    if (totalWeight <= box.maxWeight) {
      return {
        box,
        type: "BOX"
      };
    }
  }

  // ⚠️ 2. no match → fallback to custom parcel
  return {
    box: null,
    type: "CUSTOM"
  };
};