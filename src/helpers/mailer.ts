import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Hash the userId to create a token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user with the correct token depending on the email type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken, // Corrected field name from 'varifyToken' to 'verifyToken'
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpires: Date.now() + 3600000,
      });
    }

    // Configure nodemailer transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // Set up email content based on the email type
    const mailOptions = {
      from: "rishwank773@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: `
        <p>
          Click <a href="${process.env.DOMAIN}/
          ${emailType === "VERIFY" ? "verifyemail" : "resetemail"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
          <br> Or copy and paste the link below into your browser:
          <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}


        </p>`,


    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email sent:", mailResponse);
    return mailResponse;

  } catch (error: any) {
    console.error("Error sending email:", error);
    throw error;
  }
};
