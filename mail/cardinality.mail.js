const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendCredentialsEmail = async(user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Your Login Credentials",
    html: `
      <div style="background-color: #f0f0f0; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">Hello ${user.username},</h2>
          <p style="font-size: 16px;">Your login credentials are as follows:</p>
          <ul style="font-size: 16px; list-style-type: none; padding-left: 0;">
            <li><strong>Username:</strong> ${user.username}</li>
            <li><strong>Password:</strong> ${user.password}</li>
          </ul>
        <a href="https://footbb.vercel.app/#/login" style="display: inline-block; padding: 10px 20px; background-color: #333; color: #fff; text-decoration: none; border-radius: 5px;">Login</a>
          <p style="font-size: 16px;">Please log in and change your password immediately for security reasons.</p>
          <p style="font-size: 16px;">Thank you for choosing our service.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions).then((info) => {
    console.log("Email sent: " + info.response);
  });
};

module.exports = sendCredentialsEmail;
