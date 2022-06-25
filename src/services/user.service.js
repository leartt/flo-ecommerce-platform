const UserModel = require("../models/user.model");
const ApplicationError = require("../utils/ApplicationError");

const addNewUser = async (user) => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

const getUsers = async () => {
  const users = await UserModel.find({});
  return users;
};

const getUserById = async (id) => {
  const user = await UserModel.findOne({ _id: id });
  return user;
};

module.exports = {
  addNewUser,
  getUsers,
  getUserById,
};
