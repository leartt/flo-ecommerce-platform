const AuthService = require("../services/auth.service");
const ApplicationError = require("../utils/ApplicationError");

const handleLogin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    console.log({ usernameOrEmail, password });
    const { user, token, refreshToken } = await AuthService.login({
      usernameOrEmail,
      password,
    });
    res.status(200).json({ success: true, user, token, refreshToken });
  } catch (error) {
    next(error);
  }
};

const handleSignup = async (req, res, next) => {
  try {
    const newUser = await AuthService.signup(req.body);

    res.status(201).json({
      success: true,
      newUser,
      message: "Account has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleRenewToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { newAccessToken, newRefreshToken } = await AuthService.renewToken(
      refreshToken
    );

    if (!newAccessToken || !newRefreshToken) {
      throw new ApplicationError(401, "Unauthorized");
    }

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleSignup,
  handleRenewToken,
};
