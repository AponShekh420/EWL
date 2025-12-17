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
    isVisibleProductPage: isVisibleProductPage === "true" ? true : false,
    trackStockQuantity: trackStockQuantity === "true" ? true : false,
    limitOneItemPerOrder: limitOneItemPerOrder === "true" ? true : false,
    declaredValue: Number(declaredValue),
    enelope: enelope === "true" ? true : false,
  };
};
