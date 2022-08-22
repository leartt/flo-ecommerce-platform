const router = require("express").Router();
const InvoiceController = require("../../controllers/invoice.controller");

const ApplicationError = require("../../utils/ApplicationError");
const checkAuth = require("../../middlewares/check-auth.middleware");

router.post("/generate", checkAuth, InvoiceController.handleGenerateInvoice);

module.exports = router;
