const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ApplicationError = require("../utils/ApplicationError");

module.exports = async (req, res, next) => {
  try {
    const { resetPasswordToken } = req.body;

    const decoded = jwt.verify(resetPasswordToken, "forgotpasswordsecret");
    if (!decoded) {
      throw new ApplicationError(
        401,
        "Something went wrong while verifying reset password token"
      );
    }

    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      throw new ApplicationError(401, "Not authorized to reset password");
    }

    next();
  } catch (error) {
    next(
      new ApplicationError(
        401,
        "Something went wrong while verifying reset password token"
      )
    );
  }
};
