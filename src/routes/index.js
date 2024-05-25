import { Router } from "express";
import { userRouter } from "./user.route.js";
import { todoRouter } from "./todo.route.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.use( "/user", userRouter )
router.use(verifyJWT)
router.use( "/todo", todoRouter )

export default router