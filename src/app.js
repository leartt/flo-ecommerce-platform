const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

// import db connection
const initDatabaseConnection = require("./configs/db.connection");
const { connectRedis } = require("./configs/redis.connection");
const errorMiddleware = require("./middlewares/error.middleware");

const apiEndpoints = require("./routes/index");
const generateInvoice = require("./services/invoice.service");
const { ProductModel } = require("./models/product.model");

require("dotenv").config();

// initialize express app
const app = express();

// helpful middlewares
app.use(compression());
app.use(cors({ origin: process.env.ORIGIN_DOMAIN, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// api endpoints
app.use("/api/v1", apiEndpoints);

// generateInvoice();

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
