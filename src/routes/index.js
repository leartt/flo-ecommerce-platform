const router = require("express").Router();

const productApi = require("./api/product");

router.use("/products", productApi);

module.exports = router;
