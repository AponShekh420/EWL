import { check } from "express-validator";
import UserModel from "../../models/UserModel";

const checkSignUpValidation = [ 
  check("userName")
    .isLength({min: 3})
    .withMessage("The last name is too short")
    .trim(),
  check("firstName")
    .isLength({min: 2})
    .withMessage('First name is required')
    .isAlpha('en-US', {ignore: ' -'})
    .withMessage('There should be nothing but alphabets')
    .trim(),
  check("lastName")
    .isLength({min: 2})
    .withMessage('Last name is required')
    .isAlpha('en-US', {ignore: ' -'})
    .withMessage('There should be nothing but alphabets')
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((email: string) => {
      return UserModel.findOne({email}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    })
    .trim(),
  check("password")
    .isStrongPassword()
    .withMessage('Password must be at 8 charactor long & should contain at least 3 lowercase, 3 uppercase, 3 number, & 3 symbol')
    .trim(),
  check("gender")
    .isLength({min: 2})
    .withMessage("The last name is too short")
    .trim(),
  check("isOrthodoxJew")
    .isBoolean()
    .withMessage("The last name is too short")
    .trim(),
  check("maritalStatus")
    .isLength({min: 2})
    .withMessage("The first name is too short")
    .trim(),
  check("keepsMitzvos")
    .isBoolean()
    .withMessage("The last name is too short")
    .trim(),
  check("chafifaDuration")
    .isLength({min: 2})
    .withMessage("The last name is too short")
    .trim(),
  check("chickenSoupInDairySink")
    .isLength({min: 2})
    .withMessage("The last name is too short")
    .trim()
]

export default checkSignUpValidation;