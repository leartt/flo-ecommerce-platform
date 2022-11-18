const mongoose = require("mongoose");

const { Schema } = mongoose;

const CouponSchema = new Schema({
  code: {
    type: String,
    required: ["Coupon code is required"],
    uppercase: true,
  },
  discountPercent: {
    type: Number,
    required: ["Discount percentage is required"],
    min: [1, "Minimum discount percentage is 1"],
    max: [100, "Maximum discount percentage is 100"],
  },
  expirationDate: {
    type: Date,
    required: ["Coupon expiration date is required"],
  },
});

const CouponModel = mongoose.model("Coupon", CouponSchema);

module.exports = CouponModel;
