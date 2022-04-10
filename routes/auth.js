const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_KEY),
  });

  //guardar en la base de datos
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // encuentra el usuario
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong credentials");
      return;
    }

    console.log("there is user");

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong credentials");
      return;
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
