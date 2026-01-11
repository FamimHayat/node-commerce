const emailVerificationTemplate = ({ otp, brandName = "69e-commerce" }) => {
  const year = new Date().getFullYear();

  return `
<div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    background:#0c0c0c;
    padding:20px 20px 40px;
    color:#ffffff;
  ">
 <h1 style="
  text-align:center;
  margin:0 0 12px;
  font-size:38px;
  font-weight:600;
  letter-spacing:0.4px;
  color:#ffffff;
  text-shadow:
    0 0 10px rgba(245, 239, 230, 0.6),
    0 0 20px rgba(245, 239, 230, 0.5),
    0 0 40px rgba(245, 239, 230, 0.4);
">
  shop69
</h1>

    <div style="
      max-width:520px;
      margin:auto;
      background:#0c0c0c;
      border:1px solid rgba(255,255,255,0.08);
      border-radius:3px;
      padding:32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    ">
    
        <h2 style="
        text-align:center;
        margin:0 0 12px;
        font-size:28px;
        font-weight:600;
        letter-spacing:0.4px;
      ">
        Verify your Email
      </h2>

      <p style="
        text-align:center;
        font-size:14px;
        line-height:1.6;
        color:rgba(255,255,255,0.75);
        margin:0 0 28px;
      ">
        Use the one-time password below to confirm your email address.
      </p>

      <div style="
        text-align:center;
        margin:30px 0;
      ">
        <span style="
          display:inline-block;
          background:#ffffff;
          color:#0c0c0c;
          padding:16px 32px;
          font-size:26px;
          letter-spacing:4px;
          border-radius:2px;
          font-weight:700;
        ">
       ${String(otp)}
        </span>
      </div>

      <p style="
        text-align:center;
        font-size:12px;
        color:rgba(255,255,255,0.6);
        margin:30px 0 0;
      ">
        This code will expire shortly. If you didn’t request this, you can safely ignore this email.
      </p>

      <div style="
        border-top:1px solid rgba(255,255,255,0.08);
        margin:32px 0 16px;
      "></div>

      <p style="
        text-align:center;
        font-size:11px;
        color:rgba(255,255,255,0.45);
        margin:0;
      ">
        © ${year} ${brandName}
      </p>
    </div>
  </div>
  `;
};

const forgotPasswordTemplate = ({ links, brandName = "69e-commerce" }) => {
  const year = new Date().getFullYear();

  return `
<div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    background:#0c0c0c;
    padding:20px 20px 40px;
    color:#ffffff;
  ">
 <h1 style="
  text-align:center;
  margin:0 0 12px;
  font-size:38px;
  font-weight:600;
  letter-spacing:0.4px;
  color:#ffffff;
  text-shadow:
    0 0 10px rgba(245, 239, 230, 0.6),
    0 0 20px rgba(245, 239, 230, 0.5),
    0 0 40px rgba(245, 239, 230, 0.4);
">
  shop69
</h1>

    <div style="
      max-width:520px;
      margin:auto;
      background:#0c0c0c;
      border:1px solid rgba(255,255,255,0.08);
      border-radius:3px;
      padding:32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    ">
    
        <h2 style="
        text-align:center;
        margin:0 0 12px;
        font-size:28px;
        font-weight:600;
        letter-spacing:0.4px;
      ">
        Reset your Password
      </h2>

      <p style="
        text-align:center;
        font-size:14px;
        line-height:1.6;
        color:rgba(255,255,255,0.75);
        margin:0 0 28px;
      ">
        We received a request to reset your password. Click the button below to continue.
      </p>

      <div style="
        text-align:center;
        margin:30px 0;
      ">
        <a href="${links}" style="
          display:inline-block;
          background:#ffffff;
          color:#0c0c0c;
          padding:16px 36px;
          font-size:16px;
          letter-spacing:1px;
          border-radius:2px;
          font-weight:700;
          text-decoration:none;
        ">
          RESET PASSWORD
        </a>
      </div>

      <p style="
        text-align:center;
        font-size:12px;
        color:rgba(255,255,255,0.6);
        margin:30px 0 0;
      ">
        This link will expire shortly. If you didn’t request a password reset, you can safely ignore this email.
      </p>

      <div style="
        border-top:1px solid rgba(255,255,255,0.08);
        margin:32px 0 16px;
      "></div>

      <p style="
        text-align:center;
        font-size:11px;
        color:rgba(255,255,255,0.45);
        margin:0;
      ">
        © ${year} ${brandName}
      </p>
    </div>
  </div>
  `;
};

module.exports = {
  emailVerificationTemplate,
  forgotPasswordTemplate,
};
