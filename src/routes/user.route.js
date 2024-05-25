import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteUser,
  getUserDetail,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// secure routes
router.use(verifyJWT);
router.get("/logout", logoutUser);
router.get("/user-detail", getUserDetail);
router.delete( "/delete-user", deleteUser );
router.patch('/change-password', updatePassword)

export const  userRouter = router;
