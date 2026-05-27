"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchErrorSend_1 = require("../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "User ID is required"));
        const deletedUser = await UserModel_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return next((0, http_errors_1.default)(404, `User with id ${id} not found`));
        }
        if (deletedUser?.avatar != "user.png") {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)(deletedUser?.avatar, "profile");
        }
        // user email setup
        const template = `<!DOCTYPE html>
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
                      Account Removed
                    </h2>

                    <p style="font-size:15px;color:#374151;line-height:1.6;">
                      Your <strong>Ohel Miriam</strong> account has been removed by the admin.
                    </p>

                    <p style="font-size:15px;color:#374151;line-height:1.6;">
                      You no longer have access to your account or platform services.
                    </p>

                    <p style="font-size:15px;color:#374151;line-height:1.6;">
                      If you believe this was a mistake or need additional information,
                      please contact our support team.
                    </p>

                    <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

                    <p style="font-size:14px;color:#6b7280;">
                      Contact Support:
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
        await (0, sendEmail_1.default)({
            fromEmail: `${process.env.EMAIL_USERNAME}`,
            toEmail: deletedUser.email,
            subject: "Your Ohel Miriam Account Has Been Removed",
            message: template,
        });
        return res.status(200).json({
            success: true,
            data: deletedUser,
            message: `User with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteUser = deleteUser;
