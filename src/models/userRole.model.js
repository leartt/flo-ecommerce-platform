const mongoose = require("mongoose");

const { Schema } = mongoose;

const ROLE_TYPE = require("../utils/role-types");
const assignUserPrivileges = require("../utils/assign-user-privileges");

const UserRoleSchema = new Schema({
  value: {
    type: String,
    enum: [
      ROLE_TYPE.basic,
      ROLE_TYPE.editor,
      ROLE_TYPE.admin,
      ROLE_TYPE.superadmin,
    ],
    unique: true,
    required: true,
    default: ROLE_TYPE.basic,
    lowercase: true,
  },
  privileges: {
    type: [String],
    required: true,
    default: function () {
      return assignUserPrivileges(this.value);
    },
  },
});

const UserRoleModel = mongoose.model("UserRole", UserRoleSchema);

module.exports = UserRoleModel;