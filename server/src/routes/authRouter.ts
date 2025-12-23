import express, { Request, Response } from "express"
import signup from "../controllers/auth/signup";
import signin from "../controllers/auth/signin";
import useValidationResult from "../middleware/common/useValidationResult";
import logout from "../controllers/auth/logout";
import checkSignUpValidation from "../middleware/auth/checkSignUpValidation";
import checkSignInValidation from "../middleware/auth/checkSignInValidation";
import authCheck from "../middleware/common/authCheck";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.post("/signin", upload.none(), checkSignInValidation, useValidationResult,  signin);
router.post("/signup", upload.none(), checkSignUpValidation, useValidationResult, signup);
router.patch("/logout", authCheck, logout);
router.get("/login/success", authCheck, (req: Request, res: Response) => {
    res.status(200).json({
        user: (req as any)?.user,
        msg: "Succesfully logged in",
    })
})


export default router;