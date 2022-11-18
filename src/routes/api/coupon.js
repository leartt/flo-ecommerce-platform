const router = require("express").Router();

const CouponController = require("../../controllers/coupon.controller");

router.post("/", CouponController.handleAddNewCoupon);
router.get("/", CouponController.handleGetCoupons);
router.get("/:code", CouponController.handleGetCouponByCode);
router.delete("/:code", CouponController.handleDeleteCoupon);

module.exports = router;
