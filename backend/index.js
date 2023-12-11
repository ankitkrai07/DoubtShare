const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const doubtRouter = require("./routes/doubt.route");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to DoubtShare App Backend" });
});

app.use("/users", userRouter);
app.use("/doubts", doubtRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
    console.log(`Server is running at port ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});
