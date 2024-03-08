const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    type: {
      type: String,
      enum: ["Restaurant", "Bar", "Hotel", "Hostel"],
      required: [true, "What type of business you are/have?."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    }, 
    phone: {
      type: String,
      required: [true, "Phone Number is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    picture: {
      type: String,
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema, "places");

module.exports = Place;

/* name, email, type, picture, location */