import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import { ENV } from "../config/index.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

dotenv.config();

const { req, res } = express();

export const passwordUtils = {
  length: 8,
  regex: ENV.IS_PROD
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/
    : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
  error: ENV.IS_PROD
    ? `Password: Min 8 characters, with an uppercase, a lowercase, a number, and a special character.`
    : "Password: Min 8 characters, with an uppercase, a lowercase, a number, and a special character.",
};

export class PasswordHarsher {
  static async compare(password, hash) {
    return await bcryptjs.compare(password, hash);
  }

  static async hash(password) {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  }
}

export const generateLongString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const validatePassword = (password) => {
  if (!passwordUtils.regex.test(password)) {
    throw new Error(passwordUtils.error);
  }
};


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.USER_EMAIL,
    pass: ENV.USER_PASS,
  },
});

export const sendRegistrationEmail = async (user, url) => {

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Get started with the Dime App - Confirm your email",
    text: `Hi ${user.firstName} ${user.lastName},\n\nWelcome to Dime App! We're excited to have you on board.\n\nThank you for registering. Please use the following link to complete your registration:\n\n${url}\n\nIf you have any questions or need assistance, feel free to contact our support team.\n\nBest regards,\nThe [Your Platform Name] Team.`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:" + info.response);
};
