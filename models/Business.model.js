const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const businessSchema = new Schema(
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
    phone:{
      type:String,
      required:[true, "Phone Number is required."]
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    picture: {
      type: String,
    },
    type:{
      type:String,
      required:[true, "Typology is required"]
    }
    

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Business = model("Business", businessSchema);

module.exports = Business;

/* name, email, type, picture, location */