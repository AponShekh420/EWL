"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createClass_1 = require("../../controllers/e-learning/class/createClass");
const deleteClass_1 = require("../../controllers/e-learning/class/deleteClass");
const getAllClasses_1 = require("../../controllers/e-learning/class/getAllClasses");
const getClassByFilter_1 = require("../../controllers/e-learning/class/getClassByFilter");
const getClassById_1 = require("../../controllers/e-learning/class/getClassById");
const updateClass_1 = require("../../controllers/e-learning/class/updateClass");
const updateClassStatus_1 = require("../../controllers/e-learning/class/updateClassStatus");
const multer_1 = require("../../lib/multer");
const classValidator_1 = require("../../middleware/class/classValidator");
const express_1 = require("express");
const authCheck_1 = __importDefault(require("../../middleware/common/authCheck"));
const classOrderMiddleware_1 = require("../../middleware/class/classOrderMiddleware");
const createClassOrder_1 = __importDefault(require("../../controllers/e-learning/class-order/createClassOrder"));
const classOrderSuccess_1 = __importDefault(require("../../controllers/e-learning/class-order/classOrderSuccess"));
const express_2 = __importDefault(require("express"));
const updateClassOrder_1 = require("../../controllers/e-learning/class-order/updateClassOrder");
const deleteClassOrder_1 = require("../../controllers/e-learning/class-order/deleteClassOrder");
const getClassOrderById_1 = require("../../controllers/e-learning/class-order/getClassOrderById");
const getAllClassOrders_1 = require("../../controllers/e-learning/class-order/getAllClassOrders");
const getPrivateClassOrderById_1 = require("../../controllers/e-learning/class-order/getPrivateClassOrderById");
const getAllPrivateClassOrders_1 = require("../../controllers/e-learning/class-order/getAllPrivateClassOrders");
const getClassByFilterFrontEnd_1 = require("../../controllers/e-learning/class/getClassByFilterFrontEnd");
const getPrivateClassById_1 = require("../../controllers/e-learning/class/getPrivateClassById");
const authCheckToAddUser_1 = __importDefault(require("../../middleware/common/authCheckToAddUser"));
const router = (0, express_1.Router)();
const supportedAudioFormat = [
    "audio/mpeg", // mp3
    "audio/wav",
    "audio/ogg",
    "audio/mp4", // m4a
    "audio/webm",
    "audio/aac"
];
const supportedVideoFormat = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/x-msvideo",
    "video/quicktime",
    "video/x-matroska"
];
const multiFileUploader = (0, multer_1.multerUploader)("classes", [...supportedAudioFormat, ...supportedVideoFormat, "image/jpeg", "image/png", "image/webp"]);
router.post("/class", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "audiosOne", maxCount: 10 },
    { name: "audiosTwo", maxCount: 10 },
    { name: "videosOne", maxCount: 10 },
    { name: "videosTwo", maxCount: 10 }
]), classValidator_1.classValidationRules, classValidator_1.validateClass, createClass_1.createClass);
router.put("/class/:id", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "audiosOne", maxCount: 10 },
    { name: "audiosTwo", maxCount: 10 },
    { name: "videosOne", maxCount: 10 },
    { name: "videosTwo", maxCount: 10 }
]), classValidator_1.classValidationRules, classValidator_1.validateUpdateClass, updateClass_1.updateClass);
router.put("/class-status/:id", updateClassStatus_1.updateClassStatus);
router.delete("/class/:id", deleteClass_1.deleteClass);
router.get("/class/:slug", authCheckToAddUser_1.default, getClassById_1.getClassBySlug);
router.get("/class/private/:slug", getPrivateClassById_1.getPrivateClassBySlug);
router.get("/classes", getAllClasses_1.getAllClasses);
router.get("/classes-by-filter", getClassByFilter_1.getClassByFilter);
router.get("/classes-by-filter-frontend", getClassByFilterFrontEnd_1.getClassByFilterFrontEnd);
// order
router.post("/class-order/create-order", authCheck_1.default, classOrderMiddleware_1.classOrderValidationRules, classOrderMiddleware_1.validateClassOrder, createClassOrder_1.default);
router.post("/class-order/webhook", express_2.default.raw({ type: "application/json" }), classOrderSuccess_1.default);
// router.put("/orders/:id", courseOrderValidationRules, validateCourseOrder, updateOrder);
router.put("/class-order-status/:id", updateClassOrder_1.updateClassOrder);
router.delete("/class-orders/:id", deleteClassOrder_1.deleteClassOrder);
router.get("/class-orders/:id", getClassOrderById_1.getClassOrderById);
router.get("/class-orders", getAllClassOrders_1.getAllClassOrder);
// private orders
router.get("/my-class-orders/:id", authCheck_1.default, getPrivateClassOrderById_1.getPrivateClassOrderById);
router.get("/my-class-orders", authCheck_1.default, getAllPrivateClassOrders_1.getAllPrivateClassOrder);
exports.default = router;
