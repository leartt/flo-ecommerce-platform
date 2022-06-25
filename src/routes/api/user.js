const router = require("express").Router();

const UserController = require("../../controllers/user.controller");

router.get("/", UserController.handleGetUsers);
router.post("/", UserController.handleAddNewUser);
router.get("/:id", UserController.handleGetUserById);
router.delete("/:id", UserController.handleDeleteUserById);

module.exports = router;
