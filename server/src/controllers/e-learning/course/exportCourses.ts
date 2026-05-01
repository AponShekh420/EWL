import { Request, Response } from "express";
import courses from "../../../olddata/wp_course.json";
import courseMeta from "../../../olddata/wp_coursemeta.json";
import UserModel from "../../../models/UserModel";

export const exportCourses = async (req: Request, res: Response) => {
    const courseArray = courses as any[];
    const courseMetaArray = courseMeta as any[];

    const result = [];

    for (const course of courseArray[2].data) {
        const meta = courseMetaArray[2].data.filter((m: any) => m.post_id === course.ID);

        const metaObj: Record<string, string> = {};
        meta.forEach((m: any) => {
            metaObj[m.meta_key] = m.meta_value;
        });

        const user = await UserModel.findOne({ userId: metaObj._lp_course_author });

        result.push({
            id: course.ID,
            title: course.post_title,
            slug: course.post_name,
            speaker: user?._id || "",
            course: course,
            meta: metaObj
        });
    }

    res.status(200).json(result);
};