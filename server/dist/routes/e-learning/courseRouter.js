"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courseOrderSuccess_1 = __importDefault(require("../../controllers/e-learning/course-order/courseOrderSuccess"));
const createCourseOrder_1 = __importDefault(require("../../controllers/e-learning/course-order/createCourseOrder"));
const createCourse_1 = require("../../controllers/e-learning/course/createCourse");
const deleteCourse_1 = require("../../controllers/e-learning/course/deleteCourse");
const getAllCourses_1 = require("../../controllers/e-learning/course/getAllCourses");
const getCourseByFilter_1 = require("../../controllers/e-learning/course/getCourseByFilter");
const getCourseById_1 = require("../../controllers/e-learning/course/getCourseById");
const updateCourse_1 = require("../../controllers/e-learning/course/updateCourse");
const updateCourseStatus_1 = require("../../controllers/e-learning/course/updateCourseStatus");
const deleteCourseOrder_1 = require("../../controllers/e-learning/course-order/deleteCourseOrder");
const getAllCourseOrders_1 = require("../../controllers/e-learning/course-order/getAllCourseOrders");
const getCourseOrderById_1 = require("../../controllers/e-learning/course-order/getCourseOrderById");
const updateCourseOrder_1 = require("../../controllers/e-learning/course-order/updateCourseOrder");
const multer_1 = require("../../lib/multer");
const authCheck_1 = __importDefault(require("../../middleware/common/authCheck"));
const courseOrderMiddleware_1 = require("../../middleware/course/courseOrderMiddleware");
const courseValidator_1 = require("../../middleware/course/courseValidator");
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const getPrivateCourseOrderById_1 = require("../../controllers/e-learning/course-order/getPrivateCourseOrderById");
const getAllPrivateCourseOrders_1 = require("../../controllers/e-learning/course-order/getAllPrivateCourseOrders");
const getPrivateCourseById_1 = require("../../controllers/e-learning/course/getPrivateCourseById");
const authCheckToAddUser_1 = __importDefault(require("../../middleware/common/authCheckToAddUser"));
const getCourseByFilterFrontEnd_1 = require("../../controllers/e-learning/course/getCourseByFilterFrontEnd");
const router = (0, express_1.Router)();
const multiFileUploader = (0, multer_1.multerUploader)("courses");
router.post("/course", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
]), courseValidator_1.courseValidationRules, courseValidator_1.validateCourse, createCourse_1.createCourse);
router.put("/course/:id", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
]), courseValidator_1.courseValidationRules, courseValidator_1.validateUpdateCourse, updateCourse_1.updateCourse);
router.put("/course-status/:id", updateCourseStatus_1.updateCourseStatus);
router.delete("/course/:id", deleteCourse_1.deleteCourse);
router.get("/courses", getAllCourses_1.getAllCourses);
router.get("/courses-by-filter", getCourseByFilter_1.getCourseByFilter);
router.get("/courses-by-filter-frontend", getCourseByFilterFrontEnd_1.getCourseByFilterFrontEnd);
router.get("/course/:slug", authCheckToAddUser_1.default, getCourseById_1.getCourseBySlug);
router.get("/course/private/:slug", getPrivateCourseById_1.getPrivateCourseBySlug);
// order
router.post("/order/create-order", authCheck_1.default, courseOrderMiddleware_1.courseOrderValidationRules, courseOrderMiddleware_1.validateCourseOrder, createCourseOrder_1.default);
router.post("/order/webhook", express_2.default.raw({ type: "application/json" }), courseOrderSuccess_1.default);
// router.put("/orders/:id", courseOrderValidationRules, validateCourseOrder, updateOrder);
router.put("/order-status/:id", updateCourseOrder_1.updateCourseOrder);
router.delete("/orders/:id", deleteCourseOrder_1.deleteCourseOrder);
router.get("/orders/:id", getCourseOrderById_1.getCourseOrderById);
router.get("/orders", getAllCourseOrders_1.getAllCourseOrder);
// private orders
router.get("/my-orders/:id", authCheck_1.default, getPrivateCourseOrderById_1.getPrivateCourseOrderById);
router.get("/my-orders", authCheck_1.default, getAllPrivateCourseOrders_1.getAllPrivateCourseOrder);
// export all course to database
// router.post("/courses/export", exportCourses);
// router.post("/course/orders/export", exportCourseOrders);
exports.default = router;
