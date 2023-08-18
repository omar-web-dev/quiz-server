import express from "express";
import { allMyQuizController, myQuizByIdController} from "../../controllers/MyQuizController";
const router = express.Router();

router.get("/:id", allMyQuizController);
router.post("/:id", myQuizByIdController);

module.exports = router;

// post user id
// get user id
