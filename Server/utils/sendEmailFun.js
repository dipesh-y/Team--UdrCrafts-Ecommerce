import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailFun = async ({ sendTo, subject, text, html }) => {
  const mailOptions = {
    from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
    to: sendTo,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ EMAIL SENT SUCCESSFULLY");
  } catch (error) {
    console.error("❌ NODEMAILER ERROR:", error);
    throw error;
  }
};

export default sendEmailFun;
