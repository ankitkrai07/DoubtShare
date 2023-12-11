const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "tutor"] },
  classGrade: String,
  language: String,
  subjectTypes: [String],
  online: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
