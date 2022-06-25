const mongoose = require("mongoose");

const { Schema } = mongoose;

const ROLE_TYPE = require("../utils/role-types");
const assignUserPrivileges = require("../utils/assign-user-privileges");

const UserRoleSchema = new Schema({
  type: {
    type: String,
    enum: [
      ROLE_TYPE.basic,
      ROLE_TYPE.editor,
      ROLE_TYPE.admin,
      ROLE_TYPE.superadmin,
    ],
    default: ROLE_TYPE.editor,
    unique: true,
    required: true,
    lowercase: true,
  },
  privileges: {
    type: [String],
    required: true,
    default: function () {
      // this.type refers to doc schema type property
      //  assign user privileges based on user role
      return assignUserPrivileges(this.type);
    },
  },
});

const UserRoleModel = mongoose.model("UserRole", UserRoleSchema);

module.exports = UserRoleModel;
