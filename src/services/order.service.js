const OrderModel = require("../models/order.model");

/**
 *
 * @param {*} orderData
 * @returns newOrder
 */
const createNewOrder = async (orderData) => {
  const newOrder = new OrderModel(orderData);

  await newOrder.save();

  return newOrder;
};

/**
 *
 * @returns orders
 */
const getOrders = async () => {
  const orders = await OrderModel.find().populate("person");
  return orders;
};

const getUserOrders = async (userId) => {
  const userOrders = await OrderModel.find(
    { person: userId },
    {},
    { sort: { createdAt: -1 } }
  );

  return userOrders;
};

const getMyOrderByOrderNumber = async ({ userId, orderNumber }) => {
  const myOrder = await OrderModel.findOne({
    person: userId,
    orderNumber,
  }).populate("products");

  return myOrder;
};

const findOrderByPaymentIntentId = async (paymentIntentId) => {
  const order = await OrderModel.findOne({ paymentIntentId });

  return order;
};

const updateDeliveryStatus = async ({ orderNumber, status }) => {
  const order = await OrderModel.findOneAndUpdate(
    { orderNumber },
    {
      $set: {
        deliveryStatus: status,
      },
    },
    { new: true }
  );
  return order;
};

module.exports = {
  getOrders,
  createNewOrder,
  findOrderByPaymentIntentId,
  getUserOrders,
  getMyOrderByOrderNumber,
  updateDeliveryStatus,
};
