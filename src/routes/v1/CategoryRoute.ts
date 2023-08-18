import express from "express";
import { addCategoryController, deleteCategoryController, getAllCategoryController } from "../../controllers/CategoryController";
const router = express.Router();

router.get("/", getAllCategoryController);
router.post("/", addCategoryController);
router.delete("/:id", deleteCategoryController);


module.exports = router;
