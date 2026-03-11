import express from "express";
import { createUser } from "../controllers/user/createUser";
import { deleteUser } from "../controllers/user/deleteUser";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { getUserById } from "../controllers/user/getUserById";
import { updateUser } from "../controllers/user/updateUser";
import { multerUploader } from "../lib/multer";
import {
  profileUpdateValidationRules,
  userUpdateValidationRules,
  userValidationRules,
  validateUser,
} from "../middleware/user/userValidator";
import { getAllSpeakers } from "../controllers/user/getAllSpeakers";
import { getSpeakerByUsername } from "../controllers/user/getSpeakerByUsername";
const singleFileUploader = multerUploader("profile");
const router = express.Router();

router.post(
  "/user",
  singleFileUploader.single("avatar"),
  userValidationRules,
  validateUser,
  createUser,
);
router.put(
  "/users/:id",
  singleFileUploader.single("avatar"),
  userUpdateValidationRules,
  validateUser,
  updateUser,
);
router.put(
  "/profile/:id",
  singleFileUploader.single("avatar"),
  profileUpdateValidationRules,
  validateUser,
  updateUser,
);
router.put("/user-role/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/speaker/:username", getSpeakerByUsername);



// speaker user router
router.get("/speakers", getAllSpeakers);



export default router;
