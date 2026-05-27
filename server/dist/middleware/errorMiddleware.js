"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const multer_1 = __importDefault(require("multer"));
const notFoundHandler = (req, res, next) => {
    next((0, http_errors_1.default)(404, "requested page not found!"));
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, req, res, next) => {
    // 🔹 Handle Multer-specific errors first
    if (error instanceof multer_1.default.MulterError) {
        let message = "File upload error";
        switch (error.code) {
            case "LIMIT_FILE_SIZE":
                message = "File size too large";
                break;
            case "LIMIT_FILE_COUNT":
                message = "Too many files uploaded";
                break;
            case "LIMIT_UNEXPECTED_FILE":
                message = "Unexpected file field in form data";
                break;
            default:
                message = error.message;
        }
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message,
            error: {
                name: "MulterError",
                code: error.code,
            },
        });
    }
    // 🔹 General error handling
    const statusCode = error.statusCode || error.status || 500;
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: error.message || "Internal Server Error",
        error: {
            name: error.name || "ServerError",
            details: error.details || null,
        },
        ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
    });
};
exports.errorHandler = errorHandler;
