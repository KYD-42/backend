const express = require("express");
const router = express.Router();
const Place = require("../models/Places.model");
const Comment = require("../models/Comment.model");
const data = require("../db/index");
// Create a new comment for a specific place
router.post("/places/:id/comments", async (req, res, next) => {
    try {
       const { id } = req.params; // Correctly destructure id from req.params
       const { userName, text } = req.body;
   
       const place = await Place.findById(id); // Use the correct variable name
       if (!place) {
         return res.status(404).json({ message: "Place not found" });
       }

       const newComment = await Comment.create({ userName, text, place: id });
       res.status(201).json(newComment);
    } catch (error) {
       next(error);
    }
});

// Get all comments for a specific place
router.get("/places/:id/comments", async (req, res, next) => {
  try {
    const { id } = req.params;

    const place = await Place.findById(id).populate("comments");
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    const comments = await Comment.find({ place: id });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// Update comment
router.put("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

// Delete comment
router.delete("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
