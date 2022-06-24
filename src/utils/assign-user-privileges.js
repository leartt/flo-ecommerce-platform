const ROLE_TYPE = require("./role-types");

module.exports = function (role) {
  switch (role) {
    case ROLE_TYPE.editor:
      return ["add_product", "edit_product"];

    case ROLE_TYPE.admin:
      return [
        "add_product",
        "edit_product",
        "delete_product",
        "add_user",
        "edit_user",
      ];

    case ROLE_TYPE.superadmin:
      return [
        "add_product",
        "edit_product",
        "delete_product",
        "add_user",
        "edit_user",
        "delete_user",
      ];

    default:
      return false;
  }
};
