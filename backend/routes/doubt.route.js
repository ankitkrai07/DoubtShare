const express = require("express");
const doubtRouter = express.Router();

const authenticate = require("../middleware/authenticate");
const { DoubtModel } = require("../model/doubt.model");

doubtRouter.post("/doubts", authenticate, async (req, res) => {
  const { subject, description } = req.body;
  const student = req.user._id;

  const doubt = new DoubtModel({ student, subject, description });
  await doubt.save();

  const tutors = await User.find({
    subjectTypes: { $in: [subject] },
    classGrade: req.user.classGrade,
    language: req.user.language,
    online: true,
  });

  res.json({ message: "Doubt request submitted successfully" });
});

doubtRouter.get("/doubts", authenticate, async (req, res) => {
  const doubts = await Doubt.find({ student: req.user._id });
  res.json(doubts);
});

module.exports = doubtRouter;

// const express = require("express");
// const doubtdoubtRouter = express.doubtRouter();
// const { DoubtModel } = require("../model/doubt.model");

// const authenticate = require("../middleware/authenticate");

// const http = require("http");
// const { UserModel } = require("../model/user.model");
// const server = http.createServer(express);
// const io = require("socket.io")(server);

// const onlineTutors = {};

// io.on("connection", (socket) => {
//   socket.on("tutorConnected", (tutorId) => {
//     onlineTutors[tutorId] = socket.id;
//   });
// });

// doubtdoubtRouter.post("/doubts", authenticate, async (req, res) => {
//   const { subject, description } = req.body;
//   const student = req.user._id;

//   try {
//     const doubt = new DoubtModel({ student, subject, description });
//     await doubt.save();

//     const tutors = await UserModel.find({
//       subjectTypes: { $in: [subject] },
//       classGrade: req.user.classGrade,
//       language: req.user.language,
//       online: true,
//     });

//     tutors.forEach((tutor) => {
//       const tutorSocketId = onlineTutors[tutor._id];
//       if (tutorSocketId) {
//         io.to(tutorSocketId).emit("newDoubt", { doubtId: doubt._id });
//       }
//     });

//     res.json({ message: "Doubt request submitted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// doubtdoubtRouter.get("/doubts", authenticate, async (req, res) => {
//   try {
//     const doubts = await DoubtModel.find({ student: req.user._id });
//     res.json(doubts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = { doubtdoubtRouter, server };
