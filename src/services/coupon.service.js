const CouponModel = require("../models/coupon.model");
const ApplicationError = require("../utils/ApplicationError");

const addNewCoupon = async (data) => {
  const newCoupon = new CouponModel(data);
  await newCoupon.save();
  return newCoupon;
};

const getCoupons = async () => {
  const coupons = await CouponModel.find({});
  return coupons;
};

const getCouponByCode = async (code) => {
  const coupon = await CouponModel.findOne({ code });
  if (coupon?.expirationDate < new Date()) {
    throw new ApplicationError(500, "Coupon has been expired");
  }
  return coupon;
};

const deleteCoupon = async (code) => {
  console.log(code);
  const { deletedCount } = await CouponModel.deleteOne({ code });
  return deletedCount;
};

module.exports = {
  addNewCoupon,
  getCoupons,
  getCouponByCode,
  deleteCoupon,
};
