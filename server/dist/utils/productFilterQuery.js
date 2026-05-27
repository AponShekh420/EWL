"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFilterQuery = void 0;
const productFilterQuery = (req) => {
    const { title, category, stockStatus, stock, priceMax, priceMin } = req.query;
    let queryObject = {};
    if (title) {
        queryObject.title = { $regex: title, $options: "i" };
    }
    if (category) {
        queryObject.category = category;
    }
    if (stockStatus) {
        queryObject.stockStatus = stockStatus;
    }
    if (stock) {
        queryObject.stock = stock;
    }
    if (priceMax) {
        queryObject.salePrice = { $gte: 0, $lte: priceMax };
    }
    if (priceMin) {
        queryObject.salePrice = { $gte: priceMin, $lte: 100000 };
    }
    return queryObject;
};
exports.productFilterQuery = productFilterQuery;
