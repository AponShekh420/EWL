import { Request, Response } from "express";
import products from "../../../olddata/wp_products.json";
import productMeta from "../../../olddata/wp_productmeta.json";
// import UserModel from "../../../models/UserModel";

export const exportProducts = async (req: Request, res: Response) => {
    const productArray = products as any[];
    const productMetaArray = productMeta as any[];

    const result = [];

    for (const product of productArray[2].data) {
        const meta = productMetaArray[2].data.filter((m: any) => m.post_id === product.ID);

        const metaObj: Record<string, string> = {};
        meta.forEach((m: any) => {
            metaObj[m.meta_key] = m.meta_value;
        });

        // const user = await UserModel.findOne({ userId: metaObj._lp_course_author });

        result.push({
            id: product.ID,
            title: product.post_title,
            slug: product.post_name,
            // speaker: user?._id || "",
            product: product,
            meta: metaObj
        });
    }

    res.status(200).json(result);
};