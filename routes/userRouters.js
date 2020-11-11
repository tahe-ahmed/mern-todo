const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  let { email, password, confirmPassword, displayName } = req.body;

  // validate
  if (!email || !password || !confirmPassword || !displayName)
    return res.status(400).json({ msg: "Not all fields have been entered." });
  if (password.length < 5)
    return res
      .status(400)
      .json({ msg: "The password needs to be at least 5 characters long." });
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Enter the same password twice for verification." });

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
    res.status(200).json( savedUser );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // validate
  if (!email || !password)
    return res.status(400).json({ msg: "Not all fields have been entered." });
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

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
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    id: user._id,
    email: user.email,
  });
});

module.exports = router;
