"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const userRegisterTemplate_1 = require("../../emails/userRegisterTemplate");
const signup = async (req, res, next) => {
    const user = req.body;
    try {
        const hashedPassword = bcryptjs_1.default.hashSync(user?.password, 10);
        const addUser = new UserModel_1.default({
            ...user,
            password: hashedPassword,
            isOrthodoxJew: user?.isOrthodoxJew === "yes" ? true : false,
            keepsMitzvos: user?.keepsMitzvos === "yes" ? true : false,
        });
        const userStatus = await addUser.save();
        if (userStatus) {
            const adminUserLink = `${process.env.CLIENT_URL}/dashboard/users/edit/${userStatus?._id}`;
            const template = `<!DOCTYPE html> <html> <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f3f4f6;"> <table width="100%" cellpadding="0" cellspacing="0"> <tr> <td align="center" style="padding:40px 0;"> <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:32px;box-shadow:0 4px 10px rgba(0,0,0,0.05);"> <tr> <td> <h2 style="margin:0 0 16px;color:#111827;"> New User Registration </h2> <p style="font-size:15px;color:#374151;line-height:1.6;"> A new user has registered and is waiting for admin approval. </p> <table width="100%" cellpadding="8" cellspacing="0" style="margin-top:20px;border-collapse:collapse;"> <tr> <td style="border:1px solid #e5e7eb;font-weight:600;color:#111827;width:150px;"> Full Name </td> <td style="border:1px solid #e5e7eb;color:#374151;"> ${userStatus.firstName + " " + userStatus.lastName} </td> </tr> <tr> <td style="border:1px solid #e5e7eb;font-weight:600;color:#111827;"> Email </td> <td style="border:1px solid #e5e7eb;color:#374151;"> ${userStatus.email} </td> </tr> <tr> <td style="border:1px solid #e5e7eb;font-weight:600;color:#111827;"> Registration Date </td> <td style="border:1px solid #e5e7eb;color:#374151;"> ${new Date().toLocaleString()} </td> </tr> </table> <p style="text-align:center;margin:32px 0;"> <a href="${adminUserLink}" style="background:#111827;color:#ffffff; padding:12px 24px;border-radius:6px; text-decoration:none;font-size:15px; font-weight:600;display:inline-block;"> View User Details </a> </p> <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" /> <p style="margin-top:24px;font-size:14px;color:#374151;"> Thanks,<br /> <strong>Ohel Miriam</strong><br /> System Notification </p> </td> </tr> </table> </td> </tr> </table> </body> </html>`;
            const message = template;
            // Email send to the user
            await (0, sendEmail_1.default)({
                fromEmail: `${process.env.EMAIL_USERNAME}`,
                toEmail: user.email,
                subject: "Registration Successful — Awaiting Approval",
                message: userRegisterTemplate_1.userRegisterTemplate,
            });
            // Email send to the admin
            await (0, sendEmail_1.default)({
                fromEmail: `${process.env.EMAIL_USERNAME}`,
                toEmail: `${process.env.EMAIL_USERNAME}`,
                subject: "New User Registration Request",
                message,
            });
            res.status(200).json({
                success: true,
                status: 200,
                message: "User account created successfully!"
            });
        }
        else {
            next((0, http_errors_1.default)(500, "An error occurred while creating the user account. Please try again."));
        }
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.default = signup;
