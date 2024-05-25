import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import todoController from "../controllers/todo.controller.js";

const {addTodo, getMyTodo, updateTodo, deleteTodo, getSingleTodo, searchTodo} = todoController
const router = Router()

router.use(verifyJWT)
router.post( '/new-todo', addTodo )
router.get( '/my-todos', getMyTodo )
router.get('/single-todo/:todoId', getSingleTodo)
router.patch( '/update-todo/:todoId', updateTodo )
router.delete( '/delete-todo/:todoId', deleteTodo )
router.get('/search/:query', searchTodo)


export default router
