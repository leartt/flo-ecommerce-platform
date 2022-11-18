const router = require("express").Router();

const OrderController = require("../../controllers/order.controller");
const checkAuth = require("../../middlewares/check-auth.middleware");

router.get("/", OrderController.handleGetOrders);
router.put("/:id/delivery-status", OrderController.handleUpdateDeliveryStatus);
router.get("/my-orders", checkAuth, OrderController.handleGetMyOrders);
router.get(
  "/my-orders/:orderNumber",
  checkAuth,
  OrderController.handleGetMyOrderByOrderNumber
);
router.post("/", checkAuth, OrderController.handleCreateNewOrder);

module.exports = router;
