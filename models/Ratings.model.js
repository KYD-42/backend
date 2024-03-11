const { Schema, model, mongoose } = require("mongoose");

const ratingSchema = new Schema({
  userName: {
    type: String, // Assuming userName is a string
    required: true,
  },
  rating: {
    type: Number,
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

const Rating = model("Rating", commentSchema);

module.exports = Rating;