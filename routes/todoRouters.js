const router = require("express").Router();

const todoController = require('../controllers/todoControllers');
const authControllers = require('../controllers/authControllers');

router.post("/", authControllers.auth, todoController.postNewTodo);

router.get("/all", authControllers.auth, todoController.getAlltodosByCreator);

router.delete("/:id", authControllers.auth, todoController.deleteTodoById);

router.patch("/:id", authControllers.auth, todoController.updateTodoById);

module.exports = router;
