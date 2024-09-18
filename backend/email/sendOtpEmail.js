const {sendEmail} = require('./sendEmail');

const otpTemplate = otp => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 50px auto;
            border-radius: 8px;
        }
        .header {
            background-color: #0f6cbd;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #555555;
        }
        .otp-box {
            display: inline-block;
            background-color: #f0f0f0;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 24px;
            color: #333333;
            letter-spacing: 4px;
            margin: 20px 0;
            font-weight: bold;
        }
        .note {
            font-size: 14px;
            color: #888888;
            margin-top: 10px;
        }
        .footer {
            background-color: #0f6cbd;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>OTP Verification</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>To complete your sign-in, please use the One-Time Password (OTP) below:</p>
            <div class="otp-box">${otp}</div>
            <p>If you didn't request this code, please ignore this email or contact support.</p>
            <p>Thank you for using our service!</p>
            <p class="note">Note: For your security, never share your OTP with anyone.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

const sendOtpMail = async (email, otp) => {
  const emailDetails = {
    email,
    subject: 'OTP verification',
    slag: 'OTP email',
  };
  const content = {htmlContent: otpTemplate(otp)};
  return await sendEmail(emailDetails, content);
};

module.exports = {sendOtpMail};
