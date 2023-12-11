const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, role, classGrade, language, subjectTypes } =
    req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        password: hash,
        role,
        classGrade,
        language,
        subjectTypes,
      });
      await user.save();
      res.status(200).json({ msg: `A new ${role} has been registered` });
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, name: user.name, role: user.role },
          "masai"
        );
        res.status(200).json({ msg: "Login Successful!", token });
      } else {
        res.status(200).json({ msg: "Wrong Credentials" });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = {
  userRouter,
};
