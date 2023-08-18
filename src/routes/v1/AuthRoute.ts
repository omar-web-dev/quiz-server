import express from "express";
const router = express.Router();
import { authGuard } from "../../middlewares/authGuard";
import {
  changePasswordController,
  loginController,
  logoutController,
  registerController,
} from "../../controllers/AuthController";

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);
router.post("/change-password", changePasswordController);

module.exports = router;
