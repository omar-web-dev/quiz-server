import mongoose from "mongoose";
const quizSchema: mongoose.Schema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Category is required."],
  },

  quizList: {
    type: Array,
    time: {
      type: Number,
      default: 1,
    },
    question: {
      type: String,
      trim: true,
      required: [true, "Question is required."],
    },
    optionList: {
      type: Array,
      lowercase: true,
      required: [true, "Option is required."],
    },
    correct: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Correct Answer is required."],
    },
  },

  imageUrl: {
    type: String,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
