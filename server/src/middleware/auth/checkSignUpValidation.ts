import { body } from "express-validator";
import UserModel from "../../models/UserModel";

const checkSignUpValidation = [

  // Username
  body("userName")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .trim(),

  // First Name
  body("firstName")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("First name can contain only letters")
    .trim(),

  // Last Name
  body("lastName")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Last name can contain only letters")
    .trim(),

  // Email
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (email: string) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("Email already exists");
      }
    })
    .normalizeEmail(),

  // Password
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    ),

  // Confirm Password
  body("cpassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // Gender
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .trim(),

  // Is Orthodox Jew
  body("isOrthodoxJew")
    .notEmpty()
    .withMessage("Orthodox Jew status must be 'Yes' or 'No'")
    .trim(),

  // Marital Status
  body("maritalStatus")
    .notEmpty()
    .withMessage("Marital status is required")
    .trim(),

  // Keeps Mitzvos
  body("keepsMitzvos")
    .notEmpty()
    .withMessage("Keeps mitzvos must be 'Yes' or 'No'")
    .trim(),

  // Chafifa Duration
  body("chafifaDuration")
    .notEmpty()
    .withMessage("Chafifa duration is required")
    .trim(),

  // Chicken Soup in Dairy Sink
  body("chickenSoupInDairySink")
    .notEmpty()
    .withMessage("Please select an option for chicken soup in dairy sink")
    .trim(),
];

export default checkSignUpValidation;
