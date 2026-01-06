const nodemailer = require("nodemailer");
const { emailVerificationTemplate } = require("./templates");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async ({ email, subject, otp }) => {
  const html = emailVerificationTemplate({
    otp,
    brandName: "69e-commerce",
  });

  await transporter.sendMail({
    from: `"69e-commerce" <${process.env.APP_EMAIL}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = { sendEmail };
