import { body } from "express-validator";

const checkSignInValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email address or username is required")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage('Password is required')
    .trim()
];

export default checkSignInValidation;