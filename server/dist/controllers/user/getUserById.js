"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const getUserById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "User ID is required"));
        const user = await UserModel_1.default.findById(id);
        if (!user) {
            return next((0, http_errors_1.default)(400, "Not found user"));
        }
        return res.status(200).json({
            success: true,
            data: user,
            message: "User fetched by id successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getUserById = getUserById;
