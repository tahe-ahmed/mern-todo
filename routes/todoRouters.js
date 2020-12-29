const router = require("express").Router();

const todoController = require("../controllers/todoControllers");
const authControllers = require("../controllers/authControllers");

const {
  newTodoValidation,
  updateTodoValidation,
} = require("../validation/validation_schema");

router.post(
  "/",
  authControllers.auth,
  newTodoValidation,
  todoController.postNewTodo
);

router.get("/all", authControllers.auth, todoController.getAlltodosByCreator);

router.delete("/:id", authControllers.auth, todoController.deleteTodoById);

router.patch(
  "/:id",
  authControllers.auth,
  updateTodoValidation,
  todoController.updateTodoById
);

module.exports = router;
