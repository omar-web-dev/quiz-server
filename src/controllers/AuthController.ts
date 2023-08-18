import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  changePasswordService,
  loginService,
  registerServie,
} from "../services/AuthServices";
import { AuthRequest } from "../interfaces/AuthRequest";
import User from "../models/UserModel";

// export const loginController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     const token = await loginService(email, password);
//     res.send({
//       success: true,
//       message: `Successfully logged in!`,
//       data: { token },
//     });
//   } catch (error) {
//     // res.send({
//     //   success: false,
//     //   message: `Successfully logged in!`,
//     // });
//     next(error + "my error");
//   }
// };

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    const token = jwt.sign(
      { email, type: user?.type },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    if (user) {
      res.send({
        success: true,
        message: `Successfully logged in!`,
        data: { token },
      });
    } else {
      res.send({
        success: false,
        message: `user login flied logged`,
      });
    }

  } catch (error) {
    next(error + "my error");
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await registerServie(name, email, password, phone);
    res.send({
      success: true,
      message: `Successfully registered as ${user.name}`,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({ success: true, message: "Logout" });
  } catch (err) {
    next(err);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({ success: true, message: "Forgot Password" });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({ success: true, message: "Reset Password" });
  } catch (err) {
    next(err);
  }
};

export const changePasswordController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req?.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new Error("Password does not match");
    }
    await changePasswordService(_id, oldPassword, newPassword);
    res.send({ success: true, message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};
