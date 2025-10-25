import express from "express"
import signup from "../controllers/auth/signup";
import signin from "../controllers/auth/signin";
import useValidationResult from "../middleware/common/useValidationResult";
import logout from "../controllers/auth/logout";
import checkSignUpValidation from "../middleware/auth/checkSignUpValidation";
import checkSignInValidation from "../middleware/auth/checkSignInValidation";
import authCheck from "../middleware/common/authCheck";

const router = express.Router();

router.post("/signin", checkSignInValidation, useValidationResult, signin);
router.post("/signup", checkSignUpValidation, useValidationResult, signup)
router.patch("/logout", authCheck, logout)


export default router;