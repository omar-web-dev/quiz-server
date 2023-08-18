import express from "express";
import { addMyQuizController, myQuizByIdController } from "../../controllers/MyQuizController";
const router = express.Router();

router.get("/:id", addMyQuizController);
router.post("/", myQuizByIdController);

module.exports = router;
