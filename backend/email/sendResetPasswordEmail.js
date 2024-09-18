const {sendEmail} = require('./sendEmail');

const resetPasswordTemplate = password => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Temporary Password</title>
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
        .password-box {
            display: inline-block;
            background-color: #f0f0f0;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 24px;
            color: #333333;
            font-weight: bold;
            letter-spacing: 3px;
            margin: 20px 0;
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
            <h1>Your Temporary Password</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>As per your request, we have generated a temporary password for you to log in:</p>
            <div class="password-box">${password}</div>
            <p>Use this password to log in to your account. For your security, we strongly recommend that you change it after logging in.</p>
            <p>If you didn't request this, please ignore this email or contact support immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

const sendResetPasswordEmail = async (email, newPassword) => {
  const emailDetails = {
    email,
    subject: 'Temporary Password',
    slag: 'reset password',
  };
  const content = {htmlContent: resetPasswordTemplate(newPassword)};
  return await sendEmail(emailDetails, content);
};

module.exports = {sendResetPasswordEmail};
