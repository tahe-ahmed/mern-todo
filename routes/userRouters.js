const router = require("express").Router();

const usersControllers = require('../controllers/usersControllers');
const authControllers = require('../controllers/authControllers')

router.post("/register", usersControllers.register);

router.post("/login", usersControllers.login);

router.post("/tokenIsValid", usersControllers.isLoggedIn);

router.get("/", authControllers.auth, usersControllers.findUserById);

module.exports = router;