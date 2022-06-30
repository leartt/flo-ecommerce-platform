const mongoose = require("mongoose");
const { AddressSchema } = require("./address.model");

const { Schema } = mongoose;

const ORDER_STATUS = {
  processing: "PROCESSING",
  completed: "COMPLETED",
  failed: "FAILED",
};

const OrderSchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        ORDER_STATUS.processing,
        ORDER_STATUS.completed,
        ORDER_STATUS.failed,
      ],
      required: ["Order status is required"],
      default: ORDER_STATUS.processing,
    },
    totalPrice: {
      type: Number,
      required: ["Order total price is required"],
    },
    paymentMethod: {
      type: String,
      required: ["Order payment method is required"],
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: ["Order should have at least a product"],
      },
    ],
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
      required: ["Order should have a billing address"],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
