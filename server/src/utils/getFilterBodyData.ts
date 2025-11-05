import { Request } from "express";

export const getFilterBodyData = (req: Request) => {
  const {
    sku,
    regularPrice,
    salePrice,
    stock,
    isVisibleProductPage,
    trackStockQuantity,
    limitOneItemPerOrder,
    declaredValue,

    enelope,
  } = req.body;

  return {
    ...req.body,
    sku: Number(sku),
    regularPrice: Number(regularPrice),
    salePrice: Number(salePrice),
    stock: Number(stock),
    isVisibleProductPage: isVisibleProductPage === "yes",
    trackStockQuantity: trackStockQuantity === "yes",
    limitOneItemPerOrder: limitOneItemPerOrder === "yes",
    declaredValue: Number(declaredValue),
    enelope: enelope === "yes",
  };
};
