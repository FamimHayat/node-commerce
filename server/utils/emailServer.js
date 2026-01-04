const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async ({ email, subject, otp }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px">
      <div style="max-width:500px;margin:auto;background:#fff;padding:25px;border-radius:8px">
        
        <h2 style="text-align:center;color:#333">Email Verification</h2>

        <p style="color:#555;font-size:14px">
          Use the OTP below to verify your email address.
        </p>

        <div style="text-align:center;margin:25px 0">
          <span style="
            display:inline-block;
            background:#4f46e5;
            color:#fff;
            padding:12px 24px;
            font-size:22px;
            letter-spacing:4px;
            border-radius:6px;
            font-weight:bold">
            ${otp}
          </span>
        </div>

        <p style="font-size:13px;color:#777">
          This OTP is valid for 2 minutes.
        </p>

        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>

        <p style="font-size:12px;color:#999;text-align:center">
          © ${new Date().getFullYear()} 69e-commerce
        </p>

      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"69e-commerce" <${process.env.APP_EMAIL}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = { sendEmail };
