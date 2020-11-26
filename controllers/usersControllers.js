const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
  let { email, password, confirmPassword, displayName } = req.body;


  const existingUser = await User.findOne({ email: email });
  if (existingUser)
    return res
      .status(400)
      .json({ msg: "An account with this email already exists." });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: passwordHash,
    name: displayName,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password credentials, please try again" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const isLoggedIn = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      name: user.name,
      id: user._id,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.register = register;
exports.login = login;
exports.isLoggedIn = isLoggedIn;
exports.findUserById = findUserById;
