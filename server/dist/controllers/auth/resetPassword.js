"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenGenerator_1 = __importDefault(require("../../helpers/tokenGenerator"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const resetPassword = async (req, res) => {
    const { password: newPassword } = req.body;
    try {
        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.resetToken)
            .digest("hex");
        const user = await UserModel_1.default.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        if (!user || user == null) {
            res.status(400).json({
                errors: {
                    fail: {
                        msg: "Token is invalid or has expired"
                    }
                }
            });
        }
        else {
            const hashPassword = bcrypt.hashSync(newPassword, 10);
            user.password = hashPassword;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            const { _id, userName, firstName, lastName, email, gender, isOrthodoxJew, maritalStatus, keepsMitzvos, chafifaDuration, chickenSoupInDairySink, avatar, role } = user;
            const modifiedUser = {
                id: _id,
                userName,
                firstName,
                lastName,
                email,
                gender,
                isOrthodoxJew,
                maritalStatus,
                keepsMitzvos,
                chafifaDuration,
                chickenSoupInDairySink,
                avatar,
                role
            };
            const token = (0, tokenGenerator_1.default)(res, modifiedUser);
            res.status(200).json({
                userInfo: modifiedUser,
                token: token,
                msg: "Logged in successfully!",
                success: true
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.default = resetPassword;
