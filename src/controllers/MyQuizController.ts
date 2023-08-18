import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import { addMyQuizService } from "../services/MyQuizService";
import { getQuizByIdService } from "../services/QuizService";

export const allMyQuizController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMyQuiz = req.body;
    const data = await addMyQuizService(newMyQuiz);
    res.send({
      success: true,
      data: data,
      message: "my quiz added successfully",
    });
  } catch (err) {
    return next(err);
  }
};

export const myQuizByIdController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as { id: string };
    const data = await getQuizByIdService(id);
    res.send({ success: true, data: data });
  } catch (err) {
    return next(err);
  }
};
