import express from "express";
import {
  QuizByIdController,
  addQuizController,
  deleteQuizController,
  getQuizAddController,
  updateQuizController,
} from "../../controllers/QuizController";
const router = express.Router();

router.get("/", getQuizAddController);
router.get("/:id", QuizByIdController);
router.post("/", addQuizController);
router.put("/:id", updateQuizController);
router.delete("/:id", deleteQuizController);

module.exports = router;
