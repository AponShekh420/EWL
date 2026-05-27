"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_errors_1 = __importDefault(require("http-errors"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const updateUser = async (req, res, next) => {
    const id = req.params?.id;
    const body = req.body;
    const file = req.file;
    try {
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        // Find old user
        const oldUser = await UserModel_1.default.findById(id);
        if (!oldUser)
            return next((0, http_errors_1.default)(404, "User not found"));
        const updatedData = {};
        if (body.role) {
            updatedData.role = body.role;
        }
        if (body.status) {
            updatedData.status = body.status;
        }
        if (file) {
            updatedData.avatar = file.filename;
        }
        // start
        if (body.firstName) {
            updatedData.firstName = body.firstName;
        }
        if (body.lastName) {
            updatedData.lastName = body.lastName;
        }
        if (body.email) {
            updatedData.email = body.email;
        }
        if (body.userName) {
            updatedData.userName = body.userName;
        }
        if (body.gender) {
            updatedData.gender = body.gender;
        }
        if (body.maritalStatus) {
            updatedData.maritalStatus = body.maritalStatus;
        }
        if (body.chafifaDuration) {
            updatedData.chafifaDuration = body.chafifaDuration;
        }
        if (body.chickenSoupInDairySink) {
            updatedData.chickenSoupInDairySink = body.chickenSoupInDairySink;
        }
        if (body.bio) {
            updatedData.bio = body.bio;
        }
        if (body.isOrthodoxJew) {
            updatedData.isOrthodoxJew = body.isOrthodoxJew === "true" ? true : false;
        }
        if (body.keepsMitzvos) {
            updatedData.keepsMitzvos = body.keepsMitzvos === "true" ? true : false;
        }
        // end
        if (body.password) {
            updatedData.password = bcryptjs_1.default.hashSync(body.password, 10);
        }
        if (body.newPassword && body.oldPassword) {
            updatedData.password = bcryptjs_1.default.hashSync(body.newPassword, 10);
        }
        // ---- UPDATE USER ----
        const updatedUser = await UserModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser)
            return next((0, http_errors_1.default)(400, "Failed to update user"));
        if (file && oldUser.avatar && (oldUser?.avatar != "user.png")) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)(oldUser.avatar, "profile");
        }
        // approved user email
        if (body.status && body.status == "active") {
            const Approvedtemplate = `<!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:40px 0;">
                <table width="600" cellpadding="0" cellspacing="0"
                  style="background:#ffffff;border-radius:8px;padding:32px;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

                  <tr>
                    <td>

                      <h2 style="margin:0 0 16px;color:#111827;">
                        Account Approved
                      </h2>

                      <p style="font-size:15px;color:#374151;line-height:1.6;">
                        Good news! Your <strong>Ohel Miriam</strong> account has been approved by the admin.
                      </p>

                      <p style="font-size:15px;color:#374151;line-height:1.6;">
                        Your account is now active and you can log in and access your profile.
                      </p>

                      <p style="text-align:center;margin:32px 0;">
                        <a href="${process.env.CLIENT_URL}/login"
                          style="background:#111827;color:#ffffff;
                                padding:12px 24px;border-radius:6px;
                                text-decoration:none;font-size:15px;
                                font-weight:600;display:inline-block;">
                          Login to Your Account
                        </a>
                      </p>

                      <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

                      <p style="font-size:14px;color:#6b7280;">
                        Need help? Contact us at
                        <a href="mailto:ohelmiriam@gmail.com" style="color:#111827;">
                          ohelmiriam@gmail.com
                        </a>
                      </p>

                      <p style="margin-top:24px;font-size:14px;color:#374151;">
                        Thanks,<br />
                        <strong>Ohel Miriam</strong><br />
                        Ohel Miriam Team
                      </p>

                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`;
            // Email send to the user
            await (0, sendEmail_1.default)({
                fromEmail: `${process.env.EMAIL_USERNAME}`,
                toEmail: updatedUser?.email,
                subject: "Your Ohel Miriam Account Has Been Approved",
                message: Approvedtemplate,
            });
        }
        // pending user email
        if (body.status && body.status == "pending") {
            const Pendingtemplate = `<!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:40px 0;">
                <table width="600" cellpadding="0" cellspacing="0"
                  style="background:#ffffff;border-radius:8px;padding:32px;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

                  <tr>
                    <td>

                      <h2 style="margin:0 0 16px;color:#111827;">
                        Account Status Updated
                      </h2>

                      <p style="font-size:15px;color:#374151;line-height:1.6;">
                        Your <strong>Ohel Miriam</strong> account status has been changed back to pending by the admin.
                      </p>

                      <p style="font-size:15px;color:#374151;line-height:1.6;">
                        Your account is temporarily under review and access may be limited until approval is completed again.
                      </p>

                      <p style="font-size:15px;color:#374151;line-height:1.6;">
                        You will receive another email once your account becomes active again.
                      </p>

                      <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

                      <p style="font-size:14px;color:#6b7280;">
                        Need help? Contact us at
                        <a href="mailto:ohelmiriam@gmail.com" style="color:#111827;">
                          ohelmiriam@gmail.com
                        </a>
                      </p>

                      <p style="margin-top:24px;font-size:14px;color:#374151;">
                        Thanks,<br />
                        <strong>Ohel Miriam</strong><br />
                        Ohel Miriam Team
                      </p>

                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`;
            // Email send to the user
            await (0, sendEmail_1.default)({
                fromEmail: `${process.env.EMAIL_USERNAME}`,
                toEmail: updatedUser?.email,
                subject: "Your Ohel Miriam Account Has Been Moved Back to Pending Status",
                message: Pendingtemplate,
            });
        }
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateUser = updateUser;
