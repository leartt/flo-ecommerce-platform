const jwt = require("jsonwebtoken");
const { client: redisClient } = require("../configs/redis.connection");
const ApplicationError = require("../utils/ApplicationError");

const generateAccessToken = (userId) => {
  const payload = {
    _id: userId,
  };

  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    issuer: "flo-ecommerce",
  });

  if (!token) throw new ApplicationError(401, "authorization error");

  return token;
};

const generateRefreshToken = async (userId) => {
  const payload = {
    _id: userId,
  };

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    issuer: "flo-ecommerce",
  });

  if (!refreshToken) throw new ApplicationError(401, "authorization error");

  await redisClient.set(String(payload._id), refreshToken, {
    PX: process.env.JWT_REFRESH_EXPIRATION,
  });

  return refreshToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
