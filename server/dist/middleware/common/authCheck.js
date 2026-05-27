"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const authCheck = async (req, res, next) => {
    const { session } = req.cookies;
    if (session) {
        try {
            const verifyedToken = jsonwebtoken_1.default.verify(session, process.env.TOKEN_SECRET || "sdfjskldjfkljdflkj");
            if (verifyedToken) {
                const checkValidation = await UserModel_1.default.findOne({ email: verifyedToken.email }, "-password");
                if (checkValidation) {
                    req.user = checkValidation;
                    return next();
                }
                else {
                    return next((0, http_errors_1.default)(403, "Authentication Problem"));
                }
            }
            else {
                return next((0, http_errors_1.default)(403, "Authentication Problem"));
            }
        }
        catch (err) {
            console.log(err);
            return next((0, http_errors_1.default)(401, "Invalid or expired token"));
        }
    }
    else {
        return next((0, http_errors_1.default)(403, "Authentication Problem"));
    }
};
exports.default = authCheck;
