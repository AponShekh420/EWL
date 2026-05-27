"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: options.fromEmail,
        to: options.toEmail,
        subject: options.subject,
        html: options.message,
        //text:
    };
    await transporter.sendMail(mailOptions);
};
exports.default = sendEmail;
