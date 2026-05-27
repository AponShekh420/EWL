"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/shippo.js
const shippo_1 = require("shippo");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new shippo_1.Shippo({
    apiKeyHeader: `ShippoToken ${process.env.SHIPPO_API_KEY || "dfsdfsdfsfaasd"}`,
});
exports.default = client;
