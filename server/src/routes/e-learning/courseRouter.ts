import courseOrderSuccess from "../../controllers/e-learning/course-order/courseOrderSuccess";
import createCourseOrder from "../../controllers/e-learning/course-order/createCourseOrder";
import { createCourse } from "../../controllers/e-learning/course/createCourse";
import { deleteCourse } from "../../controllers/e-learning/course/deleteCourse";
import { getAllCourses } from "../../controllers/e-learning/course/getAllCourses";
import { getCourseByFilter } from "../../controllers/e-learning/course/getCourseByFilter";
import { getCourseBySlug } from "../../controllers/e-learning/course/getCourseById";
import { updateCourse } from "../../controllers/e-learning/course/updateCourse";
import { updateCourseStatus } from "../../controllers/e-learning/course/updateCourseStatus";
import { deleteCourseOrder } from "../../controllers/ecommerce/course-order/deleteCourseOrder";
import { getAllCourseOrder } from "../../controllers/ecommerce/course-order/getAllCourseOrders";
import { getCourseOrderById } from "../../controllers/ecommerce/course-order/getCourseOrderById";
import { updateCourseOrder } from "../../controllers/ecommerce/course-order/updateCourseOrder";
import { multerUploader } from "../../lib/multer";
import authCheck from "../../middleware/common/authCheck";
import { courseOrderValidationRules, validateCourseOrder } from "../../middleware/course/courseOrderMiddleware";
import {
  courseValidationRules,
  validateCourse,
  validateUpdateCourse,
} from "../../middleware/course/courseValidator";

import { Router } from "express";
import express from "express"
const router = Router();

const multiFileUploader = multerUploader("courses");

router.post(
  "/course",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
  ]),

  courseValidationRules,
  validateCourse,
  createCourse,
);
router.put(
  "/course/:id",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
  ]),
  courseValidationRules,
  validateUpdateCourse,
  updateCourse,
);
router.put("/course-status/:id", updateCourseStatus);
router.delete("/course/:id", deleteCourse);

router.get("/courses", getAllCourses);
router.get("/courses-by-filter", getCourseByFilter);
router.get("/course/:slug", getCourseBySlug);



// order
router.post("/order/create-order", authCheck, courseOrderValidationRules, validateCourseOrder, createCourseOrder);
router.post("/order/webhook", express.raw({type:"application/json"}), courseOrderSuccess);
// router.put("/orders/:id", courseOrderValidationRules, validateCourseOrder, updateOrder);
router.put("/order-status/:id", updateCourseOrder);
router.delete("/orders/:id", deleteCourseOrder);
router.get("/orders/:id", getCourseOrderById);
router.get("/orders", getAllCourseOrder);

export default router;
