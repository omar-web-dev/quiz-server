import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";

import {
  addQuizService,
  deleteQuizService,
  getAllQuizService,
  getQuizByCategoryService,
  getQuizByIdService,
  updateQuizService,
} from "../services/QuizService";

export const getQuizController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await getAllQuizService();
    res.send({ success: true, data: quiz });
  } catch (err) {
    return next(err);
  }
};

export const QuizByIdController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as { id: string };
    console.log(req.params)
    const data = await getQuizByIdService(id);
    res.send({ success: true, data: data });
  } catch (err) {
    return next(err);
  }
};

export const QuizByCategoryController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params as { category: string };
    console.log(req.params)
    const data = await getQuizByCategoryService(category);
    res.send({ success: true, data: data });
  } catch (err) {
    return next(err);
  }
};

export const addQuizController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizData = req.body;
    const data = await addQuizService(quizData);
    res.send({ success: true, data, message: "Quiz added successfully" });
  } catch (err) {
    return next(err);
  }
};

export const updateQuizController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as { id: string };

    const userId = req.user?._id;
    const updatedProduct = req.body;
    const data = await updateQuizService(updatedProduct, id, userId);
    res.send({
      success: true,
      data: data,
      message: "Quiz updated successfully",
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteQuizController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?._id;
    const data = await deleteQuizService(id, userId);
    res.send({
      success: true,
      data: data,
      message: "Quiz deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
};
