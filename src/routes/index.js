const router = require("express").Router();

const productApi = require("./api/product");
const userApi = require("./api/user");
const authApi = require("./api/auth");

router.use("/products", productApi);
router.use("/users", userApi);
router.use("/auth", authApi);

module.exports = router;
