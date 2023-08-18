import mongoose from "mongoose";
const quizSchema: mongoose.Schema = new mongoose.Schema({
  questions: {
    type: String,
    trim: true,
  },

  option1: {
    type: String,
    trim: true,
  },
  option2: {
    type: String,
    trim: true,
  },
  option3: {
    type: String,
    trim: true,
  },
  option4: {
    type: String,
    trim: true,
  },
  correctAnswer: {
    type: String,
    trim: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
