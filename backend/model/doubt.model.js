const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doubtSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "user" },
  tutor: { type: Schema.Types.ObjectId, ref: "user" },
  subject: String,
  description: String,
  status: { type: String, enum: ["pending", "accepted", "rejected"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const DoubtModel = mongoose.model("Doubt", doubtSchema);

module.exports = { DoubtModel };
