const { Schema, model, mongoose } = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    type: [{
      type: String,
      enum: ["Restaurant", "Bar", "Hotel", "Hostel"],
      required: true,
  }],
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    rating: {
      type: Number
    },
    priceLevel: {
      type: String,
/*       enum: ["€", "€-€€", "€€", "€€-€€€","€€€","€€€-€€€€", "€€€€"],-
 */      required: true,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    comments: [{ type: String }]
   /*  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] */   
  },
  {
    // This object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema, "places");

module.exports = Place;