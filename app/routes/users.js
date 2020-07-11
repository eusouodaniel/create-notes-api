var express = require('express');
var router = express.Router();
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

router.post('/login', async function(req, res) {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  try {
    if (!user) {
      res.status(401).json({ error: "Incorrect email or password" });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (!same) {
          res.status(401).json({ error: "Incorrect email or password" });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: process.env.JWT_EXPIRES_IN });
          res.json({ user: user, token: token });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.post('/register', async function(req, res) {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registering new user please try again" });
  }
});

module.exports = router;
