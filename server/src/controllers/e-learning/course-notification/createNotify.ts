import { Request, Response } from "express";
import sendEmail from "../../../utils/sendEmail";
import CourseModel from "../../../models/CourseModel";
import courseNotificationEmail from "../../../emails/courseNotificationEmail";

const createNotify = async (req: Request, res: Response) => {
    const body = req?.body
    const course = await CourseModel.findById(body.courses[0]?._id)
    .select("title slug");

    const emailTemplate = courseNotificationEmail({
    ...req.body,

    courseTitle: course?.title,
    courseSlug: course?.slug,
    });
    try {
        // Email send to the admin
        await sendEmail({
            fromEmail: `Ohel Miriam${process.env.EMAIL_USERNAME}`,
            toEmail: `${process.env.EMAIL_USERNAME}`,
            subject: `${emailTemplate.subject}`,
            message: emailTemplate.html,
        })
        return res.status(200).json({ success: true, message: "Notification request sent successfully!" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

export default createNotify;