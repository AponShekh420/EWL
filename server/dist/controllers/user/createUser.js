"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_errors_1 = __importDefault(require("http-errors"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const createUser = async (req, res, next) => {
    try {
        const body = req.body;
        const existEmail = await UserModel_1.default.findOne({ email: body.email });
        if (existEmail) {
            return next((0, http_errors_1.default)(409, "User with this email already exists"));
        }
        const existUsername = await UserModel_1.default.findOne({ username: body.username });
        if (existUsername) {
            return next((0, http_errors_1.default)(409, "User with this username already exists"));
        }
        const hashedPassword = bcryptjs_1.default.hashSync(body.password, 10);
        const createdUser = await UserModel_1.default.create({
            ...body,
            password: hashedPassword,
        });
        if (!createdUser) {
            return next((0, http_errors_1.default)(400, "Failed to create user"));
        }
        return res.status(201).json({
            success: true,
            data: createdUser,
            message: "User created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createUser = createUser;
