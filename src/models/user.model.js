const validator = require("validator");
const mongoose = require("mongoose");
const UserRoleModel = require("./user-role.model");

const ROLE_TYPE = require("../utils/role-types");

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
      minLength: [6, "Password should be at least 6 characters long"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "UserRole",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.role) {
      // query the userrole document, get BASIC ROLE id and assign as default role
      const basicRole = await UserRoleModel.findOne({ value: ROLE_TYPE.basic });
      this.role = basicRole._id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
