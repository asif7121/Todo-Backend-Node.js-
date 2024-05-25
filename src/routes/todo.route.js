import { Router } from "express";
import todoController from "../controllers/todo.controller.js";

const {addTodo, getMyTodo, updateTodo, deleteTodo, getSingleTodo, searchTodo} = todoController
const router = Router()


router.post( '/new-todo', addTodo )
router.get( '/my-todos', getMyTodo )
router.get('/single-todo/:todoId', getSingleTodo)
router.patch( '/update-todo/:todoId', updateTodo )
router.delete( '/delete-todo/:todoId', deleteTodo )



export const todoRouter =  router
