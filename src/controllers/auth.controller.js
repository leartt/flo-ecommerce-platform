const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const AuthService = require("../services/auth.service");
const ApplicationError = require("../utils/ApplicationError");

const handleLogin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.login({
      usernameOrEmail,
      password,
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: process.env.JWT_REFRESH_EXPIRATION,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ success: true, user, accessToken });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    console.log(req.cookies);
    res.clearCookie("refresh_token");
    res.end();
  } catch (error) {
    next(new ApplicationError(401, "Authentication error"));
  }
};

const handleGetLoggedInUser = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      throw new ApplicationError(401, "Not authorized");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const handleSignup = async (req, res, next) => {
  try {
    await AuthService.signup(req.body);

    res.status(201).json({
      success: true,
      message: "Account has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* eslint-disable */
const handleRenewToken = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const refresh_token = req.cookies.refresh_token;
    const { newAccessToken, newRefreshToken } = await AuthService.renewToken(
      refresh_token
    );

    if (!newAccessToken || !newRefreshToken) {
      throw new ApplicationError(401, "Unauthorized");
    }

    res.cookie("refresh_token", newRefreshToken, {
      maxAge: process.env.JWT_REFRESH_EXPIRATION,
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(new ApplicationError(401, error.message));
  }
};

const handleForgotPassword = async (req, res, next) => {
  try {
    // need to implement logic
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApplicationError(404, "Email address doesn't exist");
    }
    await AuthService.sendEmailForgotPassword({ email });
    res
      .status(200)
      .json({ success: true, message: "Reset password link is sent to email" });
  } catch (error) {
    if (error.name === "ApplicationError") {
      next(error);
      return;
    }
    next(new ApplicationError(500, error.message));
  }
};

const handleResetPassword = async (req, res, next) => {
  try {
    const { resetPasswordToken, password, confirmPassword } = req.body;

    const decoded = jwt.verify(resetPasswordToken, "forgotpasswordsecret");
    if (!decoded) {
      throw new ApplicationError(
        401,
        "Something went wrong while verifying reset password token"
      );
    }

    if (password !== confirmPassword) {
      throw new ApplicationError(400, "Password do not match");
    }

    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      throw new ApplicationError(401, "Not authorized to reset password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await user.update({ $set: { password: hashedPassword } });

    res.status(200).json({
      success: true,
      message: "You've successfully reset your password",
    });
  } catch (error) {
    next(
      new ApplicationError(
        401,
        "Something went wrong while verifying reset password token"
      )
    );
  }
};

module.exports = {
  handleLogin,
  handleSignup,
  handleLogout,
  handleRenewToken,
  handleGetLoggedInUser,
  handleForgotPassword,
  handleResetPassword,
};
