"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_1 = require("../controllers/user/createUser");
const deleteUser_1 = require("../controllers/user/deleteUser");
const getAllUsers_1 = require("../controllers/user/getAllUsers");
const getUserById_1 = require("../controllers/user/getUserById");
const updateUser_1 = require("../controllers/user/updateUser");
const multer_1 = require("../lib/multer");
const userValidator_1 = require("../middleware/user/userValidator");
const getAllSpeakers_1 = require("../controllers/user/getAllSpeakers");
const getSpeakerByUsername_1 = require("../controllers/user/getSpeakerByUsername");
const singleFileUploader = (0, multer_1.multerUploader)("profile");
const router = express_1.default.Router();
router.post("/user", singleFileUploader.single("avatar"), userValidator_1.userValidationRules, userValidator_1.validateUser, createUser_1.createUser);
router.put("/users/:id", singleFileUploader.single("avatar"), userValidator_1.userUpdateValidationRules, userValidator_1.validateUser, updateUser_1.updateUser);
router.put("/profile/:id", singleFileUploader.single("avatar"), userValidator_1.profileUpdateValidationRules, userValidator_1.validateUser, updateUser_1.updateUser);
router.put("/user-role/:id", updateUser_1.updateUser);
router.put("/user-status/:id", updateUser_1.updateUser);
router.delete("/users/:id", deleteUser_1.deleteUser);
router.get("/users", getAllUsers_1.getAllUsers);
router.get("/users/:id", getUserById_1.getUserById);
router.get("/speaker/:username", getSpeakerByUsername_1.getSpeakerByUsername);
// router.post("/users/export", usersExport)
// speaker user router
router.get("/speakers", getAllSpeakers_1.getAllSpeakers);
exports.default = router;
