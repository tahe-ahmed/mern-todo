const router = require("express").Router();
const { body } = require("express-validator");

const usersControllers = require("../controllers/usersControllers");
const authControllers = require("../controllers/authControllers");

router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long"),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Password does not match."),
    body("displayName")
      .not()
      .isEmpty()
      .withMessage("User Name can not be empty."),
  ],
  usersControllers.register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().exists(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long"),
  ],
  usersControllers.login
);

router.post("/tokenIsValid", usersControllers.isLoggedIn);

router.get("/", authControllers.auth, usersControllers.findUserById);

module.exports = router;
