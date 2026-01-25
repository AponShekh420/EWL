import { createCourse } from "../../controllers/e-learning/course/createCourse";
import { deleteCourse } from "../../controllers/e-learning/course/deleteCourse";
import { getAllCourses } from "../../controllers/e-learning/course/getAllCourses";
import { getCourseByFilter } from "../../controllers/e-learning/course/getCourseByFilter";
import { getCourseBySlug } from "../../controllers/e-learning/course/getCourseById";
import { updateCourse } from "../../controllers/e-learning/course/updateCourse";
import { updateCourseStatus } from "../../controllers/e-learning/course/updateCourseStatus";
import { multerUploader } from "../../lib/multer";
import { courseValidationRules, validateCourse, validateUpdateCourse } from "../../middleware/course/courseValidator";

import { Router } from "express";
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
  createCourse
);
router.put(
  "/course/:id",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
  ]),
  courseValidationRules,
  validateUpdateCourse,
  updateCourse
);
router.put("/course-status/:id", updateCourseStatus);
router.delete("/course/:id", deleteCourse);
router.get("/course/:slug", getCourseBySlug);
router.get("/courses", getAllCourses);
router.get("/courses-by-filter", getCourseByFilter);

export default router;