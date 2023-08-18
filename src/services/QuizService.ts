import createHttpError from "http-errors";

import Quiz from "../models/QuizModel";
import mongoose from "mongoose";

export const addQuizService = async (cases: any) => {
  const newCase = await Quiz.create(cases);
  return newCase;
};

export const getAllQuizService = async () => {
  const cases = await Quiz.find({ isDeleted: false });
  return cases;
};

export const getQuizByIdService = async (id: string) => {
  const quizService = await Quiz.findOne({ _id: id, isDeleted: false });
  if (!quizService) {
    throw new createHttpError.NotFound("Case not found");
  }
  return quizService;
};

export const updateQuizService = async (
  updatedCase: any,
  id: string,
  userId: string
) => {
  const caseService = await Quiz.findOne({
    _id: id,
    isDeleted: false,
    seller: userId,
  });
  if (!caseService) {
    throw new createHttpError.NotFound("Case not found");
  }

  const updated = await Quiz.findOneAndUpdate(
    { _id: id, isDeleted: false, seller: userId },
    updatedCase,
    { new: true }
  );
  return updated;
};

export const deleteQuizService = async (id: string, userId: string) => {
  const caseService = await Quiz.findOne({
    _id: id,
    isDeleted: false,
    seller: userId,
  });
  if (!caseService) {
    throw new createHttpError.NotFound("Case not found");
  }

  const deleted = await Quiz.findOneAndUpdate(
    { _id: id, isDeleted: false, seller: userId },
    { isDeleted: true },
    { new: true }
  );
  return deleted;
};
