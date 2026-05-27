"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCourseOrders = void 0;
const wp_course_order_json_1 = __importDefault(require("../../../olddata/wp_course_order.json"));
const wp_course_order_meta_json_1 = __importDefault(require("../../../olddata/wp_course_order_meta.json"));
const wpl9_learnpress_order_items_json_1 = __importDefault(require("../../../olddata/wpl9_learnpress_order_items.json"));
const wpl9_learnpress_order_itemmeta_json_1 = __importDefault(require("../../../olddata/wpl9_learnpress_order_itemmeta.json"));
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const ClassOrderModel_1 = require("../../../models/ClassOrderModel");
const exportCourseOrders = async (req, res) => {
    const ordersArray = wp_course_order_json_1.default[2].data;
    const orderMetaArray = wp_course_order_meta_json_1.default[2].data;
    const itemsArray = wpl9_learnpress_order_items_json_1.default[2].data;
    const itemMetaArray = wpl9_learnpress_order_itemmeta_json_1.default[2].data;
    const courseResult = [];
    const classResult = [];
    for (const order of ordersArray) {
        // Get meta for this order (user_id, total, etc.)
        const metaEntries = orderMetaArray.filter((m) => m.post_id === order.ID);
        const metaObj = {};
        metaEntries.forEach((m) => {
            metaObj[m.meta_key] = m.meta_value;
        });
        // Get the order item(s) for this order
        const items = itemsArray.filter((i) => i.order_id === order.ID);
        // For each order item, get the course_id from itemmeta
        const courseIds = items.map((item) => {
            const courseMeta = itemMetaArray.find((m) => m.learnpress_order_item_id === item.order_item_id &&
                m.meta_key === "_course_id");
            return courseMeta?.meta_value || null;
        }).filter(Boolean);
        // Look up the user in MongoDB by their WordPress user_id
        const user = await UserModel_1.default.findOne({ userId: metaObj._user_id });
        const [classIds] = ["21940", "21622", "21043", "20534", "20415"];
        // if the user has found the course will be push
        if (user && (courseIds.length > 0)) {
            for (let oldCourseId of courseIds) {
                if (classIds.includes(oldCourseId)) {
                    const classId = await ClassModel_1.default.findOne({ classId: oldCourseId });
                    if (classId) {
                        const courseOrderData = {
                            classes: [
                                {
                                    _id: classId?._id,
                                    quantity: 1,
                                    price: Number(metaObj._order_total) || 0,
                                },
                            ],
                            customer: user?._id || null,
                            totalClass: 1,
                            stripePaymentIntentId: "",
                            paymentStatus: (order.post_status).split("-")[1] == "completed" ? "paid" : "pending",
                            fullName: "old user",
                            email: metaObj?._checkout_email || "olduser@gmail.com",
                            spouseName: "didn't get as it's a old user",
                            howDidYouHearAboutUs: "didn't get as it's a old user",
                            phoneNumber: "didn't get as it's a old user",
                            otherPhoneNumber: "didn't get as it's a old user",
                            country: "US",
                            state: "NY",
                            city: "SPRING VALLEY",
                            zip: "10977-7215",
                            streetAddress: "5 IMPERIAL LN",
                            orderId: order.ID,
                            status: (order.post_status).split("-")[1],
                            totalPrice: Number(metaObj._order_total) || 0,
                            subtotal: Number(metaObj._order_subtotal) || 0,
                        };
                        classResult.push(courseOrderData);
                        const orderRef = await ClassOrderModel_1.ClassOrderModel.create(courseOrderData);
                        const addedOrder = await orderRef.save();
                    }
                }
                else {
                    const courseId = await CourseModel_1.default.findOne({ courseId: oldCourseId });
                    if (courseId) {
                        const courseOrderData = {
                            courses: [
                                {
                                    _id: courseId?._id,
                                    quantity: 1,
                                    price: Number(metaObj._order_total) || 0,
                                },
                            ],
                            customer: user._id || null,
                            totalCourse: 1,
                            stripePaymentIntentId: "",
                            paymentStatus: (order.post_status).split("-")[1] == "completed" ? "paid" : "pending",
                            fullName: "old user",
                            email: metaObj?._checkout_email || "olduser@gmail.com",
                            spouseName: "didn't get as it's a old user",
                            howDidYouHearAboutUs: "didn't get as it's a old user",
                            phoneNumber: "didn't get as it's a old user",
                            otherPhoneNumber: "didn't get as it's a old user",
                            country: "US",
                            state: "NY",
                            city: "SPRING VALLEY",
                            zip: "10977-7215",
                            streetAddress: "5 IMPERIAL LN",
                            orderId: order.ID,
                            status: (order.post_status).split("-")[1],
                            totalPrice: Number(metaObj._order_total) || 0,
                            subtotal: Number(metaObj._order_subtotal) || 0,
                        };
                        courseResult.push(courseOrderData);
                        const orderRef = await CourseOrderModel_1.CourseOrderModel.create(courseOrderData);
                        const addedOrder = await orderRef.save();
                    }
                }
            }
        }
    }
    res.status(200).json({
        success: true,
        classResult: classResult,
        courseResult: courseResult,
        message: "Courses and class order added successfully"
    });
};
exports.exportCourseOrders = exportCourseOrders;
exports.default = exports.exportCourseOrders;
