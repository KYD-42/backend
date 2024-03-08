const { Schema, model, mongoose } = require("mongoose");

const commentSchema = new Schema({
  userName: {
    type: String, // Assuming userName is a string
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;