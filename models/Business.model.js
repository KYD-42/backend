const { Schema, model } = require("mongoose");

const businessUserSchema = new Schema(
  {
    logo: { 
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
    companyName: {
      type: String,
      required: [true, "Company name is required."],
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
      required: [true, "Phone number is required."],
/*       validate: {
        validator: function (v) {
          const regex = /^(?:\+351)?(?:91|92|93|96|21)\d{7}$/;
          return regex.test(v);
        },
        message: "Invalid phone number format.",
      },
 */    },

  },
  {
    timestamps: true,
  }
);

const BusinessUser = model("BusinessUser", businessUserSchema);

module.exports = BusinessUser;
