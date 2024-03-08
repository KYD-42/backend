const { Schema, model, mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required."],
    },
    firstName: {
      type: String,
      required: [true, "Name is required."],
    },
    lastName: {
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
    phone: {
      type: Number,
      required: [true, "Phone Number is required."],
/*       validate: {
        validator: function (v) {
          const regex = /^(?:\+351)?(?:91|92|93|96|21)\d{7}$/;
          return regex.test(v);
        },
        message: "Invalid phone number format.",
      }, */
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
      default: "",
    },
    petType: {
      type: String,
      enum: ["dog", "cat", "other"],
    },
    petAge: {
      type: Number,
    },
    petBreed: {
      type: String,
    },
    petPhoto: {
      type: String,
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