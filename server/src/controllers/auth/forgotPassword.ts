import { Request, Response } from "express"
import sendEmail from "../../utils/sendEmail"
import UserModel from "../../models/UserModel";


const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try { 
    const user = await UserModel.findOne({$or: [{email: email.toLowerCase()}, {userName: email.toLowerCase()}]});

    if (!user || user == null) {
      res.status(200).json({
        msg: "Token Sent to email!",
      })
    } else {
      const resetToken = user.createPasswordResetToken()
      await user.save()

      const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`



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
                                                Forgot your password?
                                              </h2>

                                              <p style="font-size:15px;color:#374151;line-height:1.6;">
                                                We received a request to reset the password for your
                                                <strong>ohelmiriam</strong> account.
                                              </p>

                                              <p style="font-size:15px;color:#374151;line-height:1.6;">
                                                Click the button below to create a new password.
                                              </p>

                                              <p style="text-align:center;margin:32px 0;">
                                                <a href="${resetUrl}"
                                                  style="background:#111827;color:#ffffff;
                                                        padding:12px 24px;border-radius:6px;
                                                        text-decoration:none;font-size:15px;
                                                        font-weight:600;display:inline-block;">
                                                  Reset Password
                                                </a>
                                              </p>

                                              <p style="font-size:14px;color:#6b7280;line-height:1.6;">
                                                This password reset link is valid for a limited time for security reasons.
                                              </p>

                                              <p style="font-size:14px;color:#6b7280;line-height:1.6;">
                                                If you did not request a password reset, no action is required.
                                                Your account will remain secure.
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
                                                ohelmiriam Team
                                              </p>

                                            </td>
                                          </tr>

                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </body>
                              </html>`;


      const message = template;

      try {
        await sendEmail({
          email: user.email,
          subject: "Instructions for changing your 'Ohel Miriam' Account password",
          message,
        })

        res.status(200).json({
          msg: "Token Sent to email!",
        })
      } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()
        console.log(error)

        res.status(500).json({
          errors: {
            fail: {
              msg: "There was an error in sending the email. Please Try again later"
            }
          }
        })
      }
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}


export default forgotPassword;