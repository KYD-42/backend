const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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
    userName: {
      type: String,
      required: [true, "User Name is required."],
    },
    firstName: {
      type: String,
      required: [true, "First Name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required."],
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
      validate: {
        validator: function (v) {
          return v >= 16;
        },
        message: "You must be 16 or older to register.",
      },
    },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    bio: {
      type: String,
    },
    petPhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    petName: {
      type: String,
      default: "",
    },
    petType: {
      type: String,
      enum: ["Dog", "Cat", "Other"],
    },
    petAge: {
      type: Number,
    },
    petBreed: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;