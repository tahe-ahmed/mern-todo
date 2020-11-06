const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String},
    isComplete: {type:Boolean}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
