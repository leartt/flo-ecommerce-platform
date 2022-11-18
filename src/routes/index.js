const router = require("express").Router();

const userApi = require("./api/user");
const authApi = require("./api/auth");
const productApi = require("./api/product");
const orderApi = require("./api/order");
const invoiceApi = require("./api/invoice");
const couponApi = require("./api/coupon");
const stripeApi = require("./api/stripe");

router.use("/users", userApi);
router.use("/auth", authApi);
router.use("/products", productApi);
router.use("/coupons", couponApi);
router.use("/orders", orderApi);
router.use("/invoice", invoiceApi);
router.use("/stripe", stripeApi);

module.exports = router;
