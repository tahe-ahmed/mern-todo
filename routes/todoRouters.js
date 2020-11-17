const router = require("express").Router();
const { body } = require("express-validator");

const todoController = require("../controllers/todoControllers");
const authControllers = require("../controllers/authControllers");

router.post(
  "/",
  authControllers.auth,
  [
    body("title").not().isEmpty().withMessage("Could not create ,Title can not be empty."),
    body("content")
      .isLength({ min: 8 })
      .withMessage("Could not create ,Deltails must be at least 5 chars long"),
    body("isComplete")
      .isBoolean()
      .withMessage("Could not create ,isComplete must be boolean value"),
  ],
  todoController.postNewTodo
);

router.get("/all", authControllers.auth, todoController.getAlltodosByCreator);

router.delete("/:id", authControllers.auth, todoController.deleteTodoById);

router.patch(
  "/:id",
  [
    body("title").not().isEmpty().withMessage("Could not update ,Title can not be empty."),
    body("content")
      .isLength({ min: 8 })
      .withMessage("Could not update , Deltails must be at least 8 chars long"),
  ],
  authControllers.auth,
  todoController.updateTodoById
);

module.exports = router;
