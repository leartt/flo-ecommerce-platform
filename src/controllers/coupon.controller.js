const CouponService = require("../services/coupon.service");
const ApplicationError = require("../utils/ApplicationError");

const handleAddNewCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;
    const couponExists = await CouponService.getCouponByCode(code);
    if (couponExists) throw new ApplicationError(400, "Coupon already exists");

    const coupon = await CouponService.addNewCoupon(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon has been created successfully",
      coupon,
    });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

const handleGetCouponByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const coupon = await CouponService.getCouponByCode(code);

    if (!coupon) {
      throw new ApplicationError(400, "Coupon doesn't exist");
    }

    res.status(201).json({
      success: true,
      coupon,
    });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

const handleGetCoupons = async (req, res, next) => {
  try {
    const coupons = await CouponService.getCoupons();

    if (coupons.length === 0) {
      throw new ApplicationError(400, "No coupons were found");
    }

    res.status(201).json({
      success: true,
      coupons,
    });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

const handleDeleteCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;
    const deletedCount = await CouponService.deleteCoupon(code);

    if (deletedCount < 1) {
      throw new ApplicationError(400, "Error while deleting the coupon");
    }

    res.status(200).json({
      success: true,
      message: "Coupon has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(new ApplicationError(500, error.message));
  }
};

module.exports = {
  handleAddNewCoupon,
  handleGetCoupons,
  handleGetCouponByCode,
  handleDeleteCoupon,
};
