const UserModel = require("../models/user.model");

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

const deleteUserById = async (id) => {
  const deletedCount = await UserModel.deleteOne({ _id: id });
  return deletedCount > 0;
};

module.exports = {
  addNewUser,
  getUsers,
  getUserById,
  deleteUserById,
};
