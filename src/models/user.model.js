const validator = require("validator");

const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: ["First Name is required"],
    },
    lastName: {
      type: String,
      required: ["Last Name is required"],
    },
    username: {
      type: String,
      required: ["Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: ["Username is required"],
      unique: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: ["Password is required"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "UserRole",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
