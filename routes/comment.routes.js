const express = require("express");
const router = express.Router();
const Place = require("../models/Places.model");
const Comment = require("../models/Comment.model");
const populate = require("mongoose");

// Get all comments for a specific place
router.get("/places/:id/comments", async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the place by ID and populate the 'comments' field
        const place = await Place.findById(id).populate("comments");
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json(place.comments);
    } catch (error) {
        next(error);
    }
});

// Create a new comment for a specific place
router.post("/places/:id/comments", async (req, res, next) => {
  try {
      const { id } = req.params;
      const { userName, text } = req.body;

      const place = await Place.findById(id);
      if (!place) {
          return res.status(404).json({ message: "Place not found" });
      }

      const newComment = await Comment.create({ userName, text, place: id });

      place.comments.push(newComment._id);
      await place.save();

      res.status(201).json(newComment);
  } catch (error) {
      next(error);
  }
});

// Update comment by comment ID
router.put("/comments/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
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

// Update comment by place ID
router.put("/places/:id/comments", async (req, res, next) => {
  try {
      const { id } = req.params;
      const { userName, text } = req.body;

      const place = await Place.findById(id);
      if (!place) {
          return res.status(404).json({ message: "Place not found" });
      }

      const newComment = await Comment.create({ userName, text, place: id });

      place.comments.push(newComment._id);
      await place.save();

      res.status(201).json(newComment);
  } catch (error) {
      next(error);
  }
});

// Delete comment by comment ID
router.delete("/comments/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        next(error);
    }
});

// Delete comment by place ID
router.delete("/places/:id/comments", async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;