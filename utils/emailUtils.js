import nodemailer from "nodemailer";
import db from "../config/db.js";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: db.EMAIL_SERVICE || "gmail",
    auth: {
      user: db.EMAIL_USER,
      pass: db.EMAIL_PASS,
    },
  });
};

const emailTemplates = {
  resetPasswordOtp: ({ otp }) => ({
    subject: "Password Reset OTP",
    html: `
      <h3>Password Reset Request</h3>
      <p>Your OTP for password reset is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  }),

  verifyAccountOtp: ({ otp }) => ({
    subject: "Verify Your Account",
    html: `
      <h3>Account Verification</h3>
      <p>Your OTP for account verification is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not create this account, you can ignore this email.</p>
    `,
  }),
};

export const sendMail = async (templateName, to, data = {}) => {
  const template = emailTemplates[templateName];

  if (!template) {
    throw new Error(`Email template not found: ${templateName}`);
  }

  const { subject, html } = template(data);
  const transporter = createTransporter();

  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

export default sendMail;
