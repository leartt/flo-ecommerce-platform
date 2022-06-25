const UserModel = require("../models/user.model");
const ApplicationError = require("../utils/ApplicationError");

const addNewUser = async (user) => {
  const newUser = new UserModel(user);
  if (newUser.email === "test@test.test") {
    throw new ApplicationError(401, "This email is not allowed");
  }
  await newUser.save();
  return newUser;
};

const getUsers = async () => {
  const users = await UserModel.find({});
  if (users.length === 0) {
    throw new ApplicationError(404, "No users were found");
  }
  return users;
};

const getUserById = async (id) => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    throw new ApplicationError(404, "No user was found");
  }
  return user;
};

module.exports = {
  addNewUser,
  getUsers,
  getUserById,
};
