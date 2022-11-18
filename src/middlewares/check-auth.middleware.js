const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ApplicationError = require("../utils/ApplicationError");

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ApplicationError(401, "Authorization header not provided");
    }

    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new ApplicationError(401, "Authorization token must be 'Bearer'");
    }
    if (!token || token === "null") {
      throw new ApplicationError(401, "No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);

    const user = await UserModel.findOne({ _id: decoded._id }).populate("role");
    if (!user) {
      throw new ApplicationError(401, "Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "ApplicationError") next(error);
    next(new ApplicationError(401, error.message));
  }
};

module.exports = checkAuth;
