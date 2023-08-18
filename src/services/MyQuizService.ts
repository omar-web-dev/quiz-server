import createHttpError from "http-errors";
import MyQuiz from "../models/MyQuizModel";

export const addMyQuizService = async (myQuiz: any) => {
  const newMyQuiz = await MyQuiz.create(myQuiz);
  return newMyQuiz;
};

export const getQuizByIdService = async (id: string) => {
  const myQuizService = await MyQuiz.findOne({ _id: id, isDeleted: false });
  if (!myQuizService) {
    throw new createHttpError.NotFound("Case not found");
  }
  return myQuizService;
};
