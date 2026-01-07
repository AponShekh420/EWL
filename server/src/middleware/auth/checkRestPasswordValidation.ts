import { body } from "express-validator";

const checkRestPasswordValidation = [
  body('password')
    .isStrongPassword()
    .withMessage('Password must be at 8 charactor long & should contain at least 3 lowercase, 3 uppercase, 3 number, & 3 symbol')
    .trim(),
]

export default checkRestPasswordValidation;