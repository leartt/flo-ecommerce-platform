const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");

// import db connection
const initDatabaseConnection = require("./configs/db.connection");
const { connectRedis } = require("./configs/redis.connection");
const errorMiddleware = require("./middlewares/error.middleware");

const apiEndpoints = require("./routes/index");

require("dotenv").config();

// initialize express app
const app = express();

// helpful middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));

// api endpoints
app.use("/api/v1", apiEndpoints);

// error middleware should be called last
app.use(errorMiddleware);

const PORT = process.env.PORT || 5500;

app.listen(PORT, async () => {
  const checkDatabaseConnection = await initDatabaseConnection();
  const checkRedisConnection = await connectRedis();
  if (!checkDatabaseConnection && !checkRedisConnection) {
    process.exit(0);
  }
  console.log(`App listening on port ${PORT}`);
});
