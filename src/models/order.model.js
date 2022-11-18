const mongoose = require("mongoose");
const { AddressSchema } = require("./address.model");
const nanoid = require("../utils/nanoid");
const { ProductSchema } = require("./product.model");

const { Schema } = mongoose;

const ORDER_DELIVERY_STATUS = {
  processing: "PROCESSING",
  verified: "VERIFIED",
  completed: "COMPLETED",
  failed: "FAILED",
};

const ExtendedProductSchema = new Schema({
  ...ProductSchema.obj,
  quantity: {
    type: Number,
  },
});

const OrderSchema = new Schema(
  {
    paymentIntentId: {
      type: String,
      required: ["Payment Intent Id is required"],
    },
    orderNumber: {
      type: String,
      required: ["Order number must be generated"],
      default: function () {
        return nanoid();
      },
    },
    deliveryStatus: {
      type: String,
      enum: [
        ORDER_DELIVERY_STATUS.processing,
        ORDER_DELIVERY_STATUS.verified,
        ORDER_DELIVERY_STATUS.completed,
        ORDER_DELIVERY_STATUS.failed,
      ],
      required: ["Order status is required"],
      default: ORDER_DELIVERY_STATUS.processing,
      uppercase: true,
    },
    paymentStatus: {
      type: String,
      required: ["Order payment status is required"],
    },
    totalPrice: {
      type: Number,
      required: ["Order total price is required"],
    },
    subtotal: {
      type: Number,
      required: ["Order subtotal price is required"],
    },
    discount: {
      code: { type: String },
      percentage: { type: String },
      value: { type: String },
    },
    paymentMethodDetails: {
      card: {
        brand: {
          type: String,
          required: ["Card Brand is required"],
        },
        expMonth: {
          type: Number,
          required: ["Card Expiration Month is required"],
        },
        expYear: {
          type: Number,
          required: ["Card Expiration Year is required"],
        },
        last4Digit: {
          type: String,
          required: ["Card last 4 digit is required"],
        },
      },
    },
    products: {
      type: [ExtendedProductSchema],
      required: ["Order should have products"],
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: ["Order should have a person associated with"],
    },
    shippingAddress: {
      type: AddressSchema,
      required: ["Order should have a shipping address"],
    },
    billingAddress: {
      type: AddressSchema,
      // required: ["Order should have a billing address"],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
