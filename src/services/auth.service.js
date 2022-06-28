const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const ApplicationError = require("../utils/ApplicationError");
const jwtService = require("./jwt.service");

/**
 * login a user
 */
const login = async ({ usernameOrEmail, password, confirmPassword }) => {
  const user = await UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) {
    throw new ApplicationError(404, "User not found");
  }
  if (password !== confirmPassword) {
    throw new ApplicationError(
      401,
      "Password and Confirm Password should match"
    );
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApplicationError(400, "Password is not valid");
  }

  const token = jwtService.generateAccessToken(user._id);
  const refreshToken = await jwtService.generateRefreshToken(user._id);

  return { user, token, refreshToken };
};

/**
 * create a new user account
 */
const signup = async (userData) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    userData;

  if (password !== confirmPassword) {
    throw new ApplicationError(
      400,
      "Password and confirm password do not match"
    );
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  if (!newUser) {
    throw new ApplicationError(500, "Something went wrong while signing up");
  }

  await newUser.save();
  return newUser;
};

module.exports = {
  login,
  signup,
};
