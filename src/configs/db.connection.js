const mongoose = require("mongoose");

const initializeDatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection with database established");
    return true;
  } catch (error) {
    console.log(error || "Error initializing database connection");
    return false;
  }
};

module.exports = initializeDatabaseConnection;
