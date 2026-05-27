"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const authCheckToAddUser = async (req, res, next) => {
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
                    return next();
                }
            }
            else {
                return next();
            }
        }
        catch (err) {
            return next();
        }
    }
    else {
        return next();
    }
};
exports.default = authCheckToAddUser;
