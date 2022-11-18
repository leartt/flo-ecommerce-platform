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

const handleDeleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleted = await UserService.deleteUserById(id);
    if (!isDeleted) {
      throw new ApplicationError(
        500,
        "The user doesn't exist or can't be deleted"
      );
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const handleUpdateMyProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName } = req.body;
    console.log(req.body);
    const user = await UserService.updateMyProfile({
      userId,
      firstName,
      lastName,
    });
    if (!user) throw new ApplicationError(404, "User not found");

    res.status(200).json({ success: true, user });
  } catch (error) {
    if (error.name === "ApplicationError") {
      next(error);
    }
    next(new ApplicationError(500, error));
  }
};

const handleAddUserShippingAddress = async (req, res, next) => {
  try {
    const { user } = req;
    const shippingAddress = req.body;
    if (!user) {
      throw new ApplicationError(401, "Unauthorized");
    }

    const { updatedUser } = await UserService.addUserShippingAddress({
      shippingAddress,
      user,
    });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddNewUser,
  handleGetUserById,
  handleGetUsers,
  handleDeleteUserById,
  handleAddUserShippingAddress,
  handleUpdateMyProfile,
};
