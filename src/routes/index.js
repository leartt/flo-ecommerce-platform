const router = require("express").Router();

const productApi = require("./api/product");
const userApi = require("./api/user");

router.use("/products", productApi);
router.use("/users", userApi);

module.exports = router;
