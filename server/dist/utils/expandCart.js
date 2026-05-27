"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandCart = void 0;
// utils/expandCart.js
const expandCart = (cart) => {
    return cart.flatMap(item => Array(item.qty).fill({
        weight: item.weight,
        length: item.length,
        width: item.width,
        height: item.height
    }));
};
exports.expandCart = expandCart;
