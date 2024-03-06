const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
    },
    picture: {
      type: String,
    },
    petType: {
      type: String,
      required: [true, "Pet Type is required."],
    },
    petAge: {
      type: Number,
      required: [true, "Pet Age is required."],
    },
    petBreed: {
      type: String,
      required: [true, "Pet Breed is required."],
    },

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

/* name, email, Age, picture, Pet Type, Pet Age, Pet Breed */
/* Object to URL method */