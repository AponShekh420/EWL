import { body } from "express-validator";

const checkForgetValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email address or username is required")
    .trim(),
];

export default checkForgetValidation;