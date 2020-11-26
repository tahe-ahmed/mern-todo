const router = require("express").Router();

const usersControllers = require("../controllers/usersControllers");
const authControllers = require("../controllers/authControllers");

const {
  userRegisValidation,
  userLoginValidation,
} = require("../validation/validation_schema");

router.post("/register", userRegisValidation, usersControllers.register);

router.post("/login", userLoginValidation, usersControllers.login);

router.post("/tokenIsValid", usersControllers.isLoggedIn);

router.get("/", authControllers.auth, usersControllers.findUserById);

module.exports = router;
