"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const logout = async (req, res, next) => {
    try {
        const logout = res.clearCookie("session");
        if (logout) {
            res.status(200).json({
                success: true,
                message: "logged out successfully"
            });
        }
        else {
            next((0, http_errors_1.default)());
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = logout;
