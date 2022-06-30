const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ApplicationError = require("../utils/ApplicationError");
const jwtService = require("./jwt.service");
const { client: redisClient } = require("../configs/redis.connection");

/**
 * login a user
 */
const login = async ({ usernameOrEmail, password }) => {
  const user = await UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) {
    throw new ApplicationError(404, "User not found");
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

const renewToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

  // get refresh token from redis and check if its equal with the requested refresh token
  const result = await redisClient.get(payload._id);
  if (refreshToken !== result) {
    throw new ApplicationError(401, "Refresh token reuse detected");
  }

  let newAccessToken;
  let newRefreshToken;

  if (refreshToken === result) {
    newAccessToken = jwtService.generateAccessToken(payload._id);
    newRefreshToken = await jwtService.generateRefreshToken(payload._id);
  }

  return { newAccessToken, newRefreshToken };
};

module.exports = {
  login,
  signup,
  renewToken,
};
