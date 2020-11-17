const Todo = require("../models/todoModel");
const { validationResult } = require("express-validator");

const postNewTodo = async (req, res) => {
  try {
    const { title, content, isComplete } = req.body;

    ////// validate the req.body inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }

    const newTodo = new Todo({
      title,
      creator: req.user,
      content,
      isComplete,
    });
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAlltodosByCreator = async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user, _id: req.params.id });
    if (!todos)
      return res.status(400).json({
        msg: "No todo item found for this todo id belongs to the current user ",
      });
    const deletedToDo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedToDo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateTodoById = async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user, _id: req.params.id });
    if (!todos)
      return res.status(400).json({
        msg: "No todo item found for this todo id belongs to the current user ",
      });

    //// if there is no isComplete in the req.body then update just title and details
    if (!(req.body.isComplete != undefined)) {
      ////// validate the req.body inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg });
      }

      const updatedToDo = await Todo.findOneAndUpdate(
        { creator: req.user, _id: req.params.id },
        { title: req.body.title, content: req.body.content },
        {
          new: true,
        }
      );
      res.status(200).json(updatedToDo);
    }

    //// if there is isComplete in the req.body then update just title and details
    if (req.body.isComplete != undefined) {
      const updatedToDo = await Todo.findOneAndUpdate(
        { creator: req.user, _id: req.params.id },
        { isComplete: req.body.isComplete },
        { new: true }
      );
      res.status(200).json(updatedToDo);
    } else {
      return res.status(400).json({
        msg: "you can either update the title or the isComplete of the todo  ",
      });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.postNewTodo = postNewTodo;
exports.getAlltodosByCreator = getAlltodosByCreator;
exports.deleteTodoById = deleteTodoById;
exports.updateTodoById = updateTodoById;
