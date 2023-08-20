import express from "express";
import {
  QuizByCategoryController,
  QuizByIdController,
  addQuizController,
  deleteQuizController,
  getQuizController,
  updateQuizController,
} from "../../controllers/QuizController";
const router = express.Router();

router.get("/", getQuizController);
router.get("/:category", QuizByCategoryController);
router.get("/:id", QuizByIdController);
router.post("/add/", addQuizController);
router.put("/:id", updateQuizController);
router.delete("/:id", deleteQuizController);

module.exports = router;
