const router = require("express").Router();

const UserController = require("../../controllers/user.controller");
const checkAuth = require("../../middlewares/check-auth.middleware");

router.get("/", UserController.handleGetUsers);
router.post("/", UserController.handleAddNewUser);
router.post(
  "/add/shipping-address",
  checkAuth,
  UserController.handleAddUserShippingAddress
);
router.get("/:id", UserController.handleGetUserById);
router.delete("/:id", UserController.handleDeleteUserById);
router.patch(
  "/my-profile/update",
  checkAuth,
  UserController.handleUpdateMyProfile
);

module.exports = router;
