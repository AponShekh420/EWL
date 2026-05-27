"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/auth/signup"));
const signin_1 = __importDefault(require("../controllers/auth/signin"));
const useValidationResult_1 = __importDefault(require("../middleware/common/useValidationResult"));
const logout_1 = __importDefault(require("../controllers/auth/logout"));
const checkSignUpValidation_1 = __importDefault(require("../middleware/auth/checkSignUpValidation"));
const checkSignInValidation_1 = __importDefault(require("../middleware/auth/checkSignInValidation"));
const authCheck_1 = __importDefault(require("../middleware/common/authCheck"));
const multer_1 = __importDefault(require("multer"));
const forgotPassword_1 = __importDefault(require("../controllers/auth/forgotPassword"));
const checkRestPasswordValidation_1 = __importDefault(require("../middleware/auth/checkRestPasswordValidation"));
const resetPassword_1 = __importDefault(require("../controllers/auth/resetPassword"));
const checkForgetValidation_1 = __importDefault(require("../middleware/auth/checkForgetValidation"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post("/signin", upload.none(), checkSignInValidation_1.default, useValidationResult_1.default, signin_1.default);
router.post("/signup", upload.none(), checkSignUpValidation_1.default, useValidationResult_1.default, signup_1.default);
router.patch("/logout", authCheck_1.default, logout_1.default);
router.get("/login/success", authCheck_1.default, (req, res) => {
    res.status(200).json({
        user: req?.user,
        msg: "Succesfully logged in",
    });
});
// reset and forget
router.post("/forgot-password", checkForgetValidation_1.default, useValidationResult_1.default, forgotPassword_1.default);
router.patch("/reset-password/:resetToken", checkRestPasswordValidation_1.default, useValidationResult_1.default, resetPassword_1.default);
exports.default = router;
