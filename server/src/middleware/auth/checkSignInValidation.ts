import { check } from "express-validator";

const checkSignInValidation = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),
  check("password")
    .isLength({min: 8})
    .withMessage('Password is required')
    .trim()
];

export default checkSignInValidation;