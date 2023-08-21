import createHttpError from "http-errors";

import Quiz from "../models/QuizModel";
import mongoose from "mongoose";
import Category from "../models/CategoryModel";
// import Category from "../models/CategoryModel";

// export const addQuizService = async (quizData : any) => {
//   const newQuiz = await Quiz.create(quizData);

//   return newQuiz;
// };

export const addQuizService = async (quizData: any) => {
  const { blockName, quizList, ...otherFields } = quizData;

  console.log(blockName)
  let category: any;

  if (blockName) {
    const categoryData = await Category.findOne({ blockName });
    category = categoryData?.blockName;
  } else {
    category = await Category.findOne({ blockName: "Default Category" });
    if (!category) {
      category = await Category.create({ blockName: "Default Category" });
    }
  }

  const newQuizData = {
    ...otherFields,
    blockName,
    quizList,
  };
  const pushQuizData = {
    quizList: quizList?.map((quizItem: any) => ({
      ...quizItem,
      quizItem,
    })),
  };

  // const newQuiz = await Quiz.create(newQuizData);
  const newQuiz = await Quiz.create(quizData)
  // await quizList.save();

  return newQuiz;
};

// export const addQuizService = async ( quizData : any) => {
//   try {
//     // Create the new quiz
//     const newQuiz = await Quiz.create({
//       ...quizData,
//       blockName: blockName, // Assuming your Quiz schema has a categoryId field
//     });
//     const count = await Quiz.countDocuments();
//     // Find the category by its ID
//     const category = await Category.findById(blockName);
//     if (!category) {
//       throw new Error("Category not found");
//     }

//     // Update the category's list of quizzes
//     category.quizzes.push(newQuiz._id);
//     await category.save();

//     return {newQuiz, count};
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to add quiz to category");
//   }
// };

export const getAllQuizService = async () => {
  const count = await Quiz.countDocuments();
  const quizList = await Quiz.find();
  return { quizList, count };
};

export const getQuizByIdService = async (id: string) => {
  const quizService = await Quiz.findOne({ _id: id, isDeleted: false });
  if (!quizService) {
    throw new createHttpError.NotFound("Case not found");
  }
  return quizService;
};

export const getQuizByCategoryService = async (category: string) => {
  const quizService = await Quiz.find({ category });
  if (!quizService) {
    throw new createHttpError.NotFound("Category not found");
  }
  return quizService;
};

export const updateQuizService = async (
  updatedCase: any,
  id: string,
  userId: string
) => {
  const categoryService = await Quiz.findOne({
    _id: id,
    isDeleted: false,
    seller: userId,
  });
  if (!categoryService) {
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
