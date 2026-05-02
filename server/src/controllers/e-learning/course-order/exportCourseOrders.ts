import { Request, Response } from "express";
import orderPosts from "../../../olddata/wp_course_order.json";
import orderPostMeta from "../../../olddata/wp_course_order_meta.json";
import orderItems from "../../../olddata/wpl9_learnpress_order_items.json";
import orderItemMeta from "../../../olddata/wpl9_learnpress_order_itemmeta.json";
import UserModel from "../../../models/UserModel";
import courseModel from "../../../models/CourseModel";
import { CourseOrderModel } from "../../../models/CourseOrderModel";

export const exportCourseOrders = async (req: Request, res: Response) => {
    const ordersArray = (orderPosts as any[])[2].data;
    const orderMetaArray = (orderPostMeta as any[])[2].data;
    const itemsArray = (orderItems as any[])[2].data;
    const itemMetaArray = (orderItemMeta as any[])[2].data;

    const result = [];

    for (const order of ordersArray) {
        // Get meta for this order (user_id, total, etc.)
        const metaEntries = orderMetaArray.filter((m: any) => m.post_id === order.ID);
        const metaObj: Record<string, string> = {};
        metaEntries.forEach((m: any) => {
            metaObj[m.meta_key] = m.meta_value;
        });

        // Get the order item(s) for this order
        const items = itemsArray.filter((i: any) => i.order_id === order.ID);

        // For each order item, get the course_id from itemmeta
        const courseIds = items.map((item: any) => {
            const courseMeta = itemMetaArray.find(
                (m: any) =>
                    m.learnpress_order_item_id === item.order_item_id &&
                    m.meta_key === "_course_id"
            );
            return courseMeta?.meta_value || null;
        }).filter(Boolean);

        // Look up the user in MongoDB by their WordPress user_id
        const user = await UserModel.findOne({ userId: metaObj._user_id });

            // if the user has found the course will be push
            if(user && (courseIds.length > 0)) {
                for(let oldCourseId of courseIds) {
                    const courseId = await courseModel.findOne({courseId: oldCourseId});
                    const courseOrderData ={
                        courses: [
                            {
                            _id: courseId?._id,
                            quantity: 1,
                            price: Number(metaObj._order_total) || 0,
                            },
                        ],
                        customer: user || null,
                        totalCourse: courseIds.length,
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
                        courseIds,
                    };
                    result.push(courseOrderData);
                    
                    const orderRef = await CourseOrderModel.create(courseOrderData);

                    const addedOrder = await orderRef.save();
                }
            }
    }

     res.status(200).json({
        success: true,
        result: result,
        message: "Courses added successfully"
    });
};

export default exportCourseOrders;