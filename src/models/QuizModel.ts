import mongoose from "mongoose";
const quizSchema: mongoose.Schema = new mongoose.Schema({
  blockName: {
    type: String,
    trim: true,
    lowercase: true,
    // required: [true, "blockName is required."],
  },
  totalQuiz: {
    type: Number,
    trim: true,
  },
  requiredQuiz: {
    type: Number,
    trim: true,
  },
  time: {
    type: Number,
    trim: true,
    default: 1,
  },

  quizList: [
    {
      type: Object,
      question: {
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
      imageUrl: {
        type: String,
        default: null,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
