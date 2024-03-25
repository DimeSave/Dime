import express from "express";
import { Op } from "sequelize";
import { v4 as uuidV4 } from "uuid";
import { HTTP_STATUS_CODE } from "../../constants/httpStatusCode.js";
import {
  passwordUtils,
  PasswordHarsher,
  generateLongString,
  sendRegistrationEmail,
} from "../../utilities/helpers.js";
import logger from "../../utilities/logger.js";
import { userRegisterSchema } from "../../utilities/validators/index.js";
import userModels from "../../models/userModels.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv";
import ENV, { APP_SECRET } from "../../config/env.js";
import jwt from "jsonwebtoken";

dotenv.config();

express();

export const registerUser = async (req, res) => {
  const passwordRegex = passwordUtils.regex;
  try {
    const userValidate = userRegisterSchema.strict().safeParse(req.body);
    if (!userValidate.success) {
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: userValidate.error.issues });
    }

    const { firstName, lastName, email, phone, password } = userValidate.data;
    const newEmail = email.trim().toLowerCase();

    if (!passwordRegex.test(password)) {
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: passwordUtils.error });
    }

    const userExist = await userModels.findOne({
      where: { [Op.or]: [{ email: newEmail }, { phone: phone }] },
    });
    if (userExist) {
      return res
        .status(HTTP_STATUS_CODE.CONFLICT)
        .send({ message: "This account already exists" });
    }

    const hashedPassword = await PasswordHarsher.hash(password);
    const id = uuidV4();
    const longString = generateLongString(50);

    await userModels.create({
      id,
      firstName,
      lastName,
      email: newEmail,
      password: hashedPassword,
      phone,
      isVerified: false,
      verifyEmailToken: longString,
    });

    const user = { email: newEmail, firstName, lastName }
    const url = 'localhost:5010/users/verifyEmail'

    sendRegistrationEmail(user, url)
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: `Registration Successful`,
      user: {
        firstName,
        lastName,
        email: newEmail,
        verifyEmailToken: longString,
      },
    });
  } catch (error) {
    logger.error("Error during registration:", error);
    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json({ message: [{ message: `This is our fault, our team is working to resolve this.` }] });
  }
};
 
export const verifyUser = async (req, res) => {
  try {
    const gottenToken  = req.headers.authorization;
    const token = gottenToken.split(' ')[1]
    const user = await userModels.findOne({
      where: { verifyEmailToken: token }
    });

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: "User not found" });
    }

    if (token !== user.verifyEmailToken) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ error: "Token is invalid" });
    }

    user.isVerified = true;
    user.verifyEmailToken = "";

    await user.save();
    const username = `${user.firstName} ${user.lastName}`;

    res.status(HTTP_STATUS_CODE.SUCCESS).json({ message: "User successfully verified", username });
  } catch (error) {
    logger.error("Error during email verification:", error);
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ error: "Verification failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModels.findOne({ where: { email } });
    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json({ message: "You are not verified. Please verify your email address." });
    }

    const isValidPassword = await PasswordHarsher.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(HTTP_STATUS_CODE.CONFLICT).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      `${APP_SECRET}`,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: "Login successful",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
    });
  } catch (error) {
    logger.error("Error during login:", error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: "Internal Server Error" });
  }
};


export const userForgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const user = await userModels.findOne({ where: { email } });
    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: `No valid user found with the provided email address.` });
    }

    const longString = generateLongString(80);
    user.resetToken = longString;
    user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await user.save();

    // Placeholder function to simulate sending email
    sendResetPasswordEmail(user.email, longString);

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ message: `Password reset link has been sent to your email if you have an account with us.` });
  } catch (error) {
    logger.error("Error in forgot password:", error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: `This is our fault, our team is working to resolve this.` });
  }
};

export const userResetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.query.token;
    const user = await userModels.findOne({ where: { resetToken: token } });
    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: `No reset token found for this valid user or the token has been used.` });
    }

    if (new Date() > user.resetTokenExpiry) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: `Password reset token has expired.` });
    }

    validatePassword(newPassword);
    const hashedPassword = await PasswordHarsher.hash(newPassword);

    user.password = hashedPassword;
    user.resetToken = "";
    user.resetTokenExpiry = new Date(0);
    await user.save();

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: `Password has been successfully reset. You can now login with your new password`,
    });
  } catch (error) {
    logger.error("Error during password reset:", error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: `This is our fault, our team is working to resolve this.` });
  }
};


// Placeholder function to simulate sending reset password email
const sendResetPasswordEmail = (email, token) => {
  // Implement your email sending logic here
  console.log(`Password reset link has been sent to ${email} with token: ${token}`);
};



// Endpoint to get user details by ID or email
export const getUser = async (req, res) => {
  try {
    const { id, email } = req.query;
    let user;

    if (id) {
      user = await userModels.findOne({ where: { id } });
    } else if (email) {
      user = await userModels.findOne({ where: { email } });
    } else {
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: "Please provide an ID or email" });
    }

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: "User not found" });
    }

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ user });
  } catch (error) {
    logger.error("Error during fetching user:", error);

    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: `This is our fault, our team is working to resolve this.` });
  }
};

// Endpoint to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModels.findAll();
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ users });
  } catch (error) {
    logger.error("Error during fetching all users:", error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: `This is our fault, our team is working to resolve this.` });
  }
};