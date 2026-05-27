"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalWeight = void 0;
// utils/calcWeight.js
const getTotalWeight = (items) => items.reduce((sum, item) => sum + item.weight, 0);
exports.getTotalWeight = getTotalWeight;
