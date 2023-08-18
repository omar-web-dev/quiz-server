import mongoose from "mongoose";
const myQuizSchema: mongoose.Schema = new mongoose.Schema({
  blockId: {
    type: String,
    trim: true,
  },

  totalQuestions: {
    type: Number,
    trim: true,
  },
 
  correctAns: {
    type: Number,
    trim: true,
  },
  percentage: {
    type: Number,
    trim: true,
  },
  time: {
    type: Number,
    trim: true,
  },
  quizList: {
    type: Array,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const MyQuiz = mongoose.model("MyQuiz", myQuizSchema);
export default MyQuiz;
