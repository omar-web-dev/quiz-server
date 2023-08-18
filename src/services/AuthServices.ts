import User from "../models/UserModel";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new createHttpError.Unauthorized("Invalid credentials");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new createHttpError.Unauthorized("Invalid credentials");
  }
  const token = jwt.sign(
    {
      _id: "64d9d0a662ece1f4ba060833",
      email: user?.email,
      isAdmin: user?.type,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  console.log(token + "ddd");
  return token;
};

export const registerServie = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  const user = await User.create({ name, email, password, phone });
  return user;
};

export const changePasswordService = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new createHttpError.NotFound("User not found");
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password); // compare old password
  if (!isMatch) {
    throw new createHttpError.Unauthorized("Invalid credentials");
  }

  user.password = newPassword;
  await user.save();
  return user;
};
