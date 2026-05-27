"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const tokenGenerator_1 = __importDefault(require("../../helpers/tokenGenerator"));
const wpCheckPassword_1 = __importDefault(require("../../lib/wpCheckPassword"));
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const userInfo = await UserModel_1.default.findOne({ $or: [{ email: email.toLowerCase() }, { userName: email.toLowerCase() }] });
    ;
    if (userInfo) {
        const passCheck = await (0, wpCheckPassword_1.default)(password, userInfo?.password);
        if (passCheck) {
            const { _id, userName, firstName, lastName, email, gender, isOrthodoxJew, maritalStatus, keepsMitzvos, chafifaDuration, chickenSoupInDairySink, avatar, role, status } = userInfo;
            if (status == "pending") {
                res.status(401).json({ errors: { failure: { msg: "Your account has been created successfully but is awaiting approval. You’ll be able to log in once it’s approved." } } });
            }
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
        else {
            res.status(401).json({ errors: { failure: { msg: "Invalid email or password." } } });
        }
    }
    else {
        res.status(401).json({ errors: { failure: { msg: "Invalid email or password." } } });
    }
};
exports.default = signin;
