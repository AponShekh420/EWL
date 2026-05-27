"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpeakerByUsername = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const getSpeakerByUsername = async (req, res, next) => {
    try {
        const username = req.params?.username;
        if (!username)
            return next((0, http_errors_1.default)(400, "Username is required"));
        const speaker = await UserModel_1.default.findOne({ userName: username, role: "speaker" }, "-passwordResetExpires -passwordResetToken -password -isOrthodoxJew -maritalStatus -keepsMitzvos -chafifaDuration -chickenSoupInDairySink");
        if (!speaker) {
            return next((0, http_errors_1.default)(400, "Not found Speaker"));
        }
        return res.status(200).json({
            success: true,
            data: speaker,
            message: "Speaker fetched by username successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getSpeakerByUsername = getSpeakerByUsername;
