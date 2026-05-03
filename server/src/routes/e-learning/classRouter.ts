import { createClass } from "../../controllers/e-learning/class/createClass";
import { deleteClass } from "../../controllers/e-learning/class/deleteClass";
import { getAllClasses } from "../../controllers/e-learning/class/getAllClasses";
import { getClassByFilter } from "../../controllers/e-learning/class/getClassByFilter";
import { getClassBySlug } from "../../controllers/e-learning/class/getClassById";
import { updateClass } from "../../controllers/e-learning/class/updateClass";
import { updateClassStatus } from "../../controllers/e-learning/class/updateClassStatus";
import { multerUploader } from "../../lib/multer";
import { classValidationRules, validateClass, validateUpdateClass } from "../../middleware/class/classValidator";

import { Router } from "express";
import authCheck from "../../middleware/common/authCheck";
import { classOrderValidationRules, validateClassOrder } from "../../middleware/class/classOrderMiddleware";
import createClassOrder from "../../controllers/e-learning/class-order/createClassOrder";
import classOrderSuccess from "../../controllers/e-learning/class-order/classOrderSuccess";
import express from "express"
import { updateClassOrder } from "../../controllers/e-learning/class-order/updateClassOrder";
import { deleteClassOrder } from "../../controllers/e-learning/class-order/deleteClassOrder";
import { getClassOrderById } from "../../controllers/e-learning/class-order/getClassOrderById";
import { getAllClassOrder } from "../../controllers/e-learning/class-order/getAllClassOrders";
import { getPrivateClassOrderById } from "../../controllers/e-learning/class-order/getPrivateClassOrderById";
import { getAllPrivateClassOrder } from "../../controllers/e-learning/class-order/getAllPrivateClassOrders";
import { getClassByFilterFrontEnd } from "../../controllers/e-learning/class/getClassByFilterFrontEnd";
import { getPrivateClassBySlug } from "../../controllers/e-learning/class/getPrivateClassById";
import authCheckToAddUser from "../../middleware/common/authCheckToAddUser";
const router = Router();

const supportedAudioFormat = [
  "audio/mpeg",   // mp3
  "audio/wav",
  "audio/ogg",
  "audio/mp4",    // m4a
  "audio/webm",
  "audio/aac"
]
const supportedVideoFormat = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/x-msvideo",
  "video/quicktime",
  "video/x-matroska"
]

const multiFileUploader = multerUploader("classes", [...supportedAudioFormat, ...supportedVideoFormat, "image/jpeg", "image/png", "image/webp"]);

router.post(
  "/class",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "audiosOne", maxCount: 10 },
    { name: "audiosTwo", maxCount: 10 },
    { name: "videosOne", maxCount: 10 },
    { name: "videosTwo", maxCount: 10 }
  ]),

  classValidationRules,
  validateClass,
  createClass
);
router.put(
  "/class/:id",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "audiosOne", maxCount: 10 },
    { name: "audiosTwo", maxCount: 10 },
    { name: "videosOne", maxCount: 10 },
    { name: "videosTwo", maxCount: 10 }
  ]),
  classValidationRules,
  validateUpdateClass,
  updateClass
);
router.put("/class-status/:id", updateClassStatus);
router.delete("/class/:id", deleteClass);
router.get("/class/:slug", authCheckToAddUser, getClassBySlug);
router.get("/class/private/:slug", getPrivateClassBySlug);
router.get("/classes", getAllClasses);
router.get("/classes-by-filter", getClassByFilter);
router.get("/classes-by-filter-frontend", getClassByFilterFrontEnd);


// order
router.post("/class-order/create-order", authCheck, classOrderValidationRules, validateClassOrder, createClassOrder);
router.post("/class-order/webhook", express.raw({type:"application/json"}), classOrderSuccess);
// router.put("/orders/:id", courseOrderValidationRules, validateCourseOrder, updateOrder);
router.put("/class-order-status/:id", updateClassOrder);
router.delete("/class-orders/:id", deleteClassOrder);
router.get("/class-orders/:id", getClassOrderById);
router.get("/class-orders", getAllClassOrder);


// private orders
router.get("/my-class-orders/:id", authCheck, getPrivateClassOrderById);
router.get("/my-class-orders", authCheck, getAllPrivateClassOrder);

export default router;