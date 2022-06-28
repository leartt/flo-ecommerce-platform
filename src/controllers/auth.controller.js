const AuthService = require("../services/auth.service");

const handleLogin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password, confirmPassword } = req.body;
    const { user, token, refreshToken } = await AuthService.login({
      usernameOrEmail,
      password,
      confirmPassword,
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

module.exports = {
  handleLogin,
  handleSignup,
};
