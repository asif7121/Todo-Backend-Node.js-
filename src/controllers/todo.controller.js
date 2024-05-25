import mongoose from "mongoose";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export default {
  addTodo: asyncHandler(async (req, res) => {
    try {
      const { title, description, favorite } = req.body;

      const todo = await Todo.create({
        title,
        description,
        favorite,
        user: req.user._id,
      });
      await User.updateOne({ _id: req.user._id }, { $push: { todos: todo } });

      res
        .status(201)
        .json(new ApiResponse(201, todo, "New Todo Added Successfully"));
    } catch (error) {
      console.log(error);
      return new ApiError(500, "something went wrong while adding new todo");
    }
  }),

  getMyTodo: asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const filterQuery = { user: req.user.id };
        if ( search ) {
            filterQuery.title = { $regex: search, $options: 'i' };
        }
      const todos = await Todo.find( filterQuery)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Todo.countDocuments({ user: req.user.id });
      res.json({
        todos,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
      return new ApiError(500, "something went wrong while fetching your todo");
    }
  }),

  updateTodo: asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const { favorite, title, description } = req.body;
    if (!(title || description || favorite)) {
      return new ApiError(400, "Please provide at least one field to update");
    }
    const todo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      {
        $set: { favorite, title, description },
      },
      { new: true }
    );
    if (!todo) new ApiResponse(404, "No todo found");
    if (todo.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to update this todo" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, todo, "Todo updated successfully"));
  }),

  deleteTodo: asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    console.log(todoId);
    if (!mongoose.isValidObjectId(todoId)) {
      throw new ApiError(403, "Invalid ObjectId ");
    }
    const todo = await Todo.findById(todoId);
    if (!todo) new ApiResponse(404, "No todo found");
    if (todo?.user.toString() !== req.user._id.toString()) {
      return new ApiError(403, "You are not authorized to delete this todo");
    }
    await todo.deleteOne({ _id: todoId });
    res
      .status(200)
      .json(new ApiResponse(200, todo, "Todo deleted successfully"));
  }),


  getSingleTodo: asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    if (!mongoose.isValidObjectId(todoId)) {
      throw new ApiError(403, "Invalid ObjectId ");
    }
    const todo = await Todo.findById(todoId);
    if (!todo) new ApiResponse(404, "No todo found");
    if (todo?.user.toString() !== req.user._id.toString()) {
      return new ApiError(403, "You are not authorized to view this todo");
    }
    res.json(new ApiResponse(200, todo, "Your todo is here."));
  }),
};
