const nodemailer = require("nodemailer")

interface EmailOptions {
  email: string
  subject: string
  message: string
}

const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: `Apon Shekh <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
    //text:
  }

  await transporter.sendMail(mailOptions)
}
export default sendEmail;