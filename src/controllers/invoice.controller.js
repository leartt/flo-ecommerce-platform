const InvoiceService = require("../services/invoice.service");
const ApplicationError = require("../utils/ApplicationError");

const handleGenerateInvoice = async (req, res, next) => {
  try {
    const order = req.body;
    const base64Pdf = await InvoiceService.generateInvoice(order);
    if (!base64Pdf) {
      throw new ApplicationError(500, "Error while generating invoice");
    }
    res.status(200).json(base64Pdf);
  } catch (error) {
    if (error.name === "ApplicationError") {
      return next(error);
    }
    next(new ApplicationError(500, error));
  }
};

module.exports = {
  handleGenerateInvoice,
};
