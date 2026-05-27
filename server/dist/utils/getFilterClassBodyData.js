"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterClassBodyData = void 0;
const getFilterClassBodyData = (req) => {
    const { metaTitle, metaDescription, title, price, offline, installmentMonths, module, contentOne, contentTwo, } = req.body;
    return {
        ...req.body,
        price: Number(price),
        module: Number(module) || 0,
        installmentMonths: Number(installmentMonths) || 0,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || (contentOne.length > contentTwo.length ? contentOne : contentTwo),
        offline: offline === "true" ? true : false,
    };
};
exports.getFilterClassBodyData = getFilterClassBodyData;
