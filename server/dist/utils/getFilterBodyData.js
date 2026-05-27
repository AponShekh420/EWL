"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterBodyData = void 0;
const getFilterBodyData = (req) => {
    const { sku, regularPrice, salePrice, stock, isVisibleProductPage, trackStockQuantity, limitOneItemPerOrder, declaredValue, metaTitle, metaDescription, enelope, title, shortDescription, } = req.body;
    return {
        ...req.body,
        sku: Number(sku),
        regularPrice: Number(regularPrice),
        salePrice: Number(salePrice),
        stock: Number(stock),
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || shortDescription,
        isVisibleProductPage: isVisibleProductPage === "true" ? true : false,
        trackStockQuantity: trackStockQuantity === "true" ? true : false,
        limitOneItemPerOrder: limitOneItemPerOrder === "true" ? true : false,
        declaredValue: Number(declaredValue),
        enelope: enelope === "true" ? true : false,
    };
};
exports.getFilterBodyData = getFilterBodyData;
