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

// it allows user to only change firstname and lastname
const updateMyProfile = async ({ userId, firstName, lastName }) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        firstName,
        lastName,
      },
    },
    { new: true }
  ).populate("role");

  return updatedUser;
};

const addUserShippingAddress = async ({ shippingAddress, user }) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    {
      _id: user._id,
    },
    {
      $push: {
        shippingAddresses: shippingAddress,
      },
    },
    { new: true }
  );

  return { updatedUser };
};

module.exports = {
  addNewUser,
  getUsers,
  getUserById,
  deleteUserById,
  addUserShippingAddress,
  updateMyProfile,
};
