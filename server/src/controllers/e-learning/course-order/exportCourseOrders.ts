import { Request, Response } from "express";
import orderPosts from "../../../olddata/wp_course_order.json";
import orderPostMeta from "../../../olddata/wp_course_order_meta.json";
import orderItems from "../../../olddata/wpl9_learnpress_order_items.json";
import orderItemMeta from "../../../olddata/wpl9_learnpress_order_itemmeta.json";
import UserModel from "../../../models/UserModel";

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

        result.push({
            orderId: order.ID,
            status: order.post_status,          // e.g. "lp-completed", "lp-cancelled"
            createdAt: order.post_date,
            userId: metaObj._user_id || null,
            user: user || null,
            courseIds,                           // array of course IDs on this order
            total: Number(metaObj._order_total) || 0,
            subtotal: Number(metaObj._order_subtotal) || 0,
            paymentMethod: metaObj._payment_method || null,
        });
    }

    res.status(200).json(result);
};

export default exportCourseOrders;