import express from "express";
import { createUser } from "../controllers/user/createUser";
import { deleteUser } from "../controllers/user/deleteUser";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { getUserById } from "../controllers/user/getUserById";
import { updateUser } from "../controllers/user/updateUser";
import { multerUploader } from "../lib/multer";
import {
  userValidationRules,
  validateUser,
} from "../middleware/user/userValidator";
const singleFileUploader = multerUploader("category");
const router = express.Router();

router.post(
  "/user",
  singleFileUploader.single("avatar"),
  userValidationRules,
  validateUser,
  createUser
);
router.put(
  "/users/:id",
  singleFileUploader.single("avatar"),
  userValidationRules,
  validateUser,
  updateUser
);
router.delete("/users/:id", deleteUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

export default router;
