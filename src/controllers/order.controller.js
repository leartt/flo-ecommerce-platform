const OrderService = require("../services/order.service");
const ApplicationError = require("../utils/ApplicationError");

const handleCreateNewOrder = async (req, res, next) => {
  try {
    const orderData = {
      ...req.body,
      person: req.user._id,
    };
    console.log(orderData);
    const orderFound = await OrderService.findOrderByPaymentIntentId(
      orderData.paymentIntentId
    );

    if (orderFound) {
      throw new ApplicationError(
        400,
        "Order has been paid before. Cannot use duplicate payment intent id"
      );
    }

    const order = await OrderService.createNewOrder(orderData);

    if (!order) {
      throw new ApplicationError("Order can not be created");
    }

    res.status(201).json({
      success: true,
      message: "Order has been created successfully",
      order,
    });
  } catch (error) {
    if (error.name === "ApplicationError") {
      return next(error);
    }
    next(new ApplicationError(500, error));
  }
};

const handleGetOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getOrders();
    if (!orders || orders.length === 0) {
      throw new ApplicationError(404, "No orders were found");
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    if (error.name === "ApplicationError") {
      return next(error);
    }
    next(new ApplicationError(500, error));
  }
};

const handleGetMyOrderByOrderNumber = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { orderNumber } = req.params;
    const myOrder = await OrderService.getMyOrderByOrderNumber({
      userId,
      orderNumber,
    });

    if (!myOrder) throw new ApplicationError(404, "Order not found");

    res.status(200).json({
      success: true,
      order: myOrder,
    });
  } catch (error) {
    if (error.name === "ApplicationError") {
      return next(error);
    }
    next(new ApplicationError(500, error));
  }
};

const handleGetMyOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await OrderService.getUserOrders(userId);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    if (error.name === "ApplicationError") {
      return next(error);
    }
    next(new ApplicationError(500, error));
  }
};

const handleUpdateDeliveryStatus = async (req, res, next) => {
  try {
    const orderNumber = req.params.id;
    const { status } = req.body;
    const updatedOrder = await OrderService.updateDeliveryStatus({
      orderNumber,
      status,
    });
    res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    if (error.name === "ApplicationError") {
      return next(error);
    }
    next(new ApplicationError(500, error));
  }
};

module.exports = {
  handleGetOrders,
  handleCreateNewOrder,
  handleGetMyOrders,
  handleGetMyOrderByOrderNumber,
  handleUpdateDeliveryStatus,
};
