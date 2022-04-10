const router = require("express").Router();

// lh:5000/api/user/usertest
router.get("/usertest", (req, res) => {
  res.send("user test is successfull");
});

// lh:5000/api/user/userposttest
router.post("/userposttest", (req, res) => {
  const username = req.body.username;
  res.send("your username is: " + username);
});

module.exports = router;
