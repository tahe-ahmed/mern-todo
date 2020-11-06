const router = require("express").Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, content, isComplete } = req.body;

    if (!title)
      return res.status(400).json({ msg: "Todo must at least have a title." });
    //// note the user is not coming from the body request , it comes from the auth middleware

    const newTodo = new Todo({
      title,
      creator: req.user,
      content,
      isComplete,
    });
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user, _id: req.params.id });
    if (!todos)
      return res.status(400).json({
        msg: "No todo item found for this todo id belongs to the current user ",
      });
    const deletedToDo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedToDo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user, _id: req.params.id });
    if (!todos)
      return res.status(400).json({
        msg: "No todo item found for this todo id belongs to the current user ",
      });
    if (req.body.title) {
      const updatedToDo = await Todo.findOneAndUpdate(
        { creator: req.user, _id: req.params.id },
        { title: req.body.title },
        {
          new: true,
        }
      );
      res.status(200).json(updatedToDo);
    }
    if (req.body.isComplete != undefined ) {
      const updatedToDo = await Todo.findOneAndUpdate(
        { creator: req.user, _id: req.params.id },
        { isComplete: req.body.isComplete },
        { new: true }
      );
      res.status(200).json(updatedToDo);
    }else{
        return res.status(400).json({
            msg: "you can either update the title or the isComplete of the todo  ",
          });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
