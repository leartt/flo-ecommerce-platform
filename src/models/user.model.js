const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserRoleModel = require("./user-role.model");

const ROLE_TYPE = require("../utils/role-types");
const ApplicationError = require("../utils/ApplicationError");
const { AddressSchema } = require("./address.model");

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
    shippingAddresses: [AddressSchema],
    billingAddresses: [AddressSchema],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.role) {
      // query the userrole document, get BASIC ROLE id and assign as default role
      const basicRole = await UserRoleModel.findOne({ type: ROLE_TYPE.basic });
      if (!basicRole) {
        throw new ApplicationError(500, "Role not found");
      }
      this.role = basicRole._id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
