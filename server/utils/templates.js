// templates.js

/**
 * Email Verification (OTP) template
 * @param {Object} params
 * @param {string|number} params.otp
 * @param {string} [params.brandName]
 * @returns {string} HTML string
 */
const emailVerificationTemplate = ({ otp, brandName = "69e-commerce" }) => {
  const year = new Date().getFullYear();

  return `
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
            ${String(otp)}
          </span>
        </div>

        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>

        <p style="font-size:12px;color:#999;text-align:center">
          © ${year} ${brandName}
        </p>

      </div>
    </div>
  `;
};

module.exports = {
  emailVerificationTemplate,
};
