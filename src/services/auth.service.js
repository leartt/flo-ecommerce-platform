const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ApplicationError = require("../utils/ApplicationError");
const jwtService = require("./jwt.service");
const { client: redisClient } = require("../configs/redis.connection");
const mailTransporter = require("../configs/mail.transporter");

/**
 * login a user
 */
const login = async ({ usernameOrEmail, password }) => {
  const user = await UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  }).populate("role");
  if (!user) {
    throw new ApplicationError(404, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApplicationError(400, "Password is not valid");
  }

  const accessToken = jwtService.generateAccessToken(user._id);
  const refreshToken = await jwtService.generateRefreshToken(user._id);

  return { user, accessToken, refreshToken };
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

const sendEmailForgotPassword = async ({ email }) => {
  const resetPasswordToken = jwt.sign({ email }, "forgotpasswordsecret", {
    expiresIn: "15m",
  });

  const resetLink = `${process.env.ORIGIN_DOMAIN}/reset-password/?token=${resetPasswordToken}`;

  const html = `
      <h5>Please click in the link below to reset your password</h5>
      <a href="${resetLink}">${resetLink}</a>
      <p>Link will expire in 10 minutes.</p>
    `;

  const mailInfo = await mailTransporter.sendMail({
    from: '"Flodev ecommerce👻" <noreply@flodev.ecommerce>', // sender address
    to: email, // list of receivers
    subject: "You've requested to reset your password", // Subject line
    text: `Reset your password by entering this link: ${resetLink}`, // plain text body
    html, // html body
  });

  console.log(mailInfo);
};

module.exports = {
  login,
  signup,
  renewToken,
  sendEmailForgotPassword,
};
