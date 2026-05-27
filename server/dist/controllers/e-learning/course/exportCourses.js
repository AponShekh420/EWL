"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCourses = void 0;
const wp_course_json_1 = __importDefault(require("../../../olddata/wp_course.json"));
const wp_coursemeta_json_1 = __importDefault(require("../../../olddata/wp_coursemeta.json"));
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const exportCourses = async (req, res) => {
    const courseArray = wp_course_json_1.default;
    const courseMetaArray = wp_coursemeta_json_1.default;
    const result = [];
    try {
        for (const course of courseArray[2].data) {
            const meta = courseMetaArray[2].data.filter((m) => m.post_id === course.ID);
            try {
                const metaObj = {};
                meta.forEach((m) => {
                    metaObj[m.meta_key] = m.meta_value;
                });
                const user = await UserModel_1.default.findOne({ userId: metaObj._lp_course_author });
                const courseData = {
                    creator: "69f4de5b95297a10b43c5391",
                    courseId: course.ID,
                    title: course.post_title,
                    slug: course.post_name,
                    speaker: user?._id || "69f4de5b95297a10b43c5391",
                    headline: metaObj?.meta_desc,
                    time: metaObj?.course_time,
                    lectures: metaObj?.lectures,
                    duration: metaObj.duration,
                    date: metaObj?.course_date,
                    aboutTab: "",
                    overviewTab: metaObj?.overview,
                    courseTopicsTab: metaObj?.course_topics,
                    speakerProfileTab: metaObj?.course_speaker_profile,
                    testimonialsTab: metaObj?.course_testimonials,
                    FAQsTab: metaObj?.course_faqs,
                    moreInfoTab: metaObj.more_info,
                    students: Number(metaObj?._lp_students),
                    externalLink: metaObj?._lp_external_link_buy_course,
                    offline: metaObj?._lp_external_link_buy_course ? true : false,
                    category: "women",
                    status: course?.post_status == "private" ? "pending" : course?.post_status,
                    thumbnail: "placeholderthumbnail.jpg",
                    price: metaObj?._lp_price,
                    customMessage: metaObj?.add_custom_message_for_notification_in_email,
                    checkoutPageMessage: metaObj?.custom_message_in_checkout_page,
                    metaTitle: course?.post_title,
                };
                result.push(courseData);
                const addedCourse = await CourseModel_1.default.create(courseData);
                if (addedCourse) {
                    await UserModel_1.default.findOneAndUpdate({ _id: addedCourse?.speaker }, { $push: { courses: addedCourse?._id } }, { new: true });
                }
                else {
                    console.log(`${courseData?.courseId} course has not been added`);
                }
            }
            catch (err) {
                // ← inner catch: skips this course and continues the loop
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                console.log(`Failed on course ${course.ID}:`, errorMessage);
            }
        }
        res.status(200).json({
            success: true,
            data: result,
            message: "Courses added successfully"
        });
    }
    catch (err) {
        // ← outer catch: fatal error (bad JSON structure, etc.)
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        res.status(500).json({ success: false, message: errorMessage });
    }
};
exports.exportCourses = exportCourses;
