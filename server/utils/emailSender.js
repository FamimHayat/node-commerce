const nodemailer = require("nodemailer");
const { emailVerificationTemplate } = require("./templates");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async ({ email, subject, otp, links, html }) => {
  await transporter.sendMail({
    from: `"shop69" <${process.env.APP_EMAIL}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = { sendEmail };
