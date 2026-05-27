"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrorSend = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend = (next, error) => {
    if (error instanceof Error) {
        console.log(error);
        return next((0, http_errors_1.default)(500, error.message));
    }
    else {
        return next((0, http_errors_1.default)(500, "something went wrong from server"));
    }
};
exports.catchErrorSend = catchErrorSend;
