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
        const commentsInPlace = await Comment.find({place: id}).populate("place");
        if (!commentsInPlace) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json(commentsInPlace);
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


        await place.save();
        res.status(200).json(newComment);
       
           
    } catch (error) {
        next(error);
    }
});

// Update comment by comment ID
router.put("/places/:placeId/comments/:commentId", async (req, res, next) => {
    try {
        const { placeId, commentId } = req.params;
        const { text } = req.body;

        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

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


// Delete comment for a specific place
router.delete("/places/:placeId/comments/:commentId", async (req, res, next) => {
    try {
        const { placeId, commentId } = req.params;

        // Find the comment and delete it
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Find the place and update its comments array
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        const commentIndex = place.comments.indexOf(commentId);
        if (commentIndex !== -1) {
            place.comments.splice(commentIndex, 1);
            await place.save();
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        next(error);
    }
});


module.exports = router;