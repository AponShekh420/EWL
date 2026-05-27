"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenGenerator = (res, userInfo) => {
    // console.log("check the object", userInfo)
    const token = jsonwebtoken_1.default.sign(userInfo, process.env.TOKEN_SECRET || "sdfjskldjfkljdflkj", {
        expiresIn: "30d",
    });
    res.cookie("session", token, {
        // signed: true,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return token;
};
exports.default = tokenGenerator;
