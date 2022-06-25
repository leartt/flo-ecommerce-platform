const UserService = require("../services/user.service");
const ApplicationError = require("../utils/ApplicationError");

const handleAddNewUser = async (req, res, next) => {
  try {
    const user = await UserService.addNewUser(req.body);
    if (!user) throw new ApplicationError(404, "User cannot be created");

    res.status(201).json({
      message: "User has been added successfully",
      success: true,
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      next(
        new ApplicationError(
          409,
          "User with that username or email already exists"
        )
      );
      return;
    }
    next(error);
  }
};

const handleGetUsers = async (req, res, next) => {
  try {
    const users = await UserService.getUsers();
    if (users.length === 0) {
      throw new ApplicationError(404, "No users were found");
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

const handleGetUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
      throw new ApplicationError(404, "The user was not found");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddNewUser,
  handleGetUserById,
  handleGetUsers,
};
