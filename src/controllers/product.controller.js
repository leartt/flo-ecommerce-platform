const ProductService = require("../services/product.service");
const ApplicationError = require("../utils/ApplicationError");
const upload = require("../utils/image-uploader");

const handleAddProduct = [
  upload.array("images"),
  async (req, res, next) => {
    try {
      console.log(req.body);
      const product = await ProductService.addProduct(req.body);
      res.status(201).json({
        message: "Product has been added successfully",
        product,
        success: true,
      });
    } catch (error) {
      next(new ApplicationError(500, error.message));
    }
  },
];

const handleFindProducts = async (req, res, next) => {
  try {
    const products = await ProductService.findProducts();
    if (products.length === 0) {
      throw new ApplicationError("No products were found", 404);
    }
    res.status(200).json({ products, success: true });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

const handleFindProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductService.findProductById(id);
    if (!product) {
      throw new ApplicationError(404, `Product with id ${id} not found`);
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

const handleDeleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProductById(id);
    res.status(200).json({
      message: `Product with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

module.exports = {
  handleAddProduct,
  handleFindProducts,
  handleFindProductById,
  handleDeleteProductById,
};
