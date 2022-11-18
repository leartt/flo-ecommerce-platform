const ProductService = require("../services/product.service");
const ApplicationError = require("../utils/ApplicationError");
const upload = require("../utils/image-uploader");

const handleAddProduct = [
  upload.array("images"),
  async (req, res, next) => {
    try {
      console.log(req.body);
      const product = await ProductService.addProduct({
        product: req.body,
        files: req.files,
      });
      res.status(201).json({
        message: "Product has been added successfully",
        product,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
];

const handleEditProduct = [
  upload.array("images"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      console.log(req.files);

      const product = await ProductService.editProduct({
        id,
        newData: req.body,
        files: req.files,
      });
      if (!product) {
        throw new ApplicationError("No product were found", 404);
      }
      res.status(200).json({ product, success: true });
    } catch (error) {
      next(error);
    }
  },
];

const handleFindProducts = async (req, res, next) => {
  try {
    /* eslint-disable */
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

const handleRateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId, ratingValue } = req.body;
    const product = await ProductService.rateProduct({
      productId,
      userId,
      ratingValue,
    });
    if (!product) {
      throw new ApplicationError(500, "Error while rating the product");
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

const handleGetCategories = async (req, res, next) => {
  try {
    const categories = await ProductService.getCategories();
    if (categories.length === 0) {
      throw new ApplicationError("No categories were found", 404);
    }
    res.status(200).json({ categories, success: true });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

const handleGetColors = async (req, res, next) => {
  try {
    const colors = await ProductService.getColors();
    if (colors.length === 0) {
      throw new ApplicationError("No colors were found", 404);
    }
    res.status(200).json({ colors, success: true });
  } catch (error) {
    next(new ApplicationError(500, error.message));
  }
};

module.exports = {
  handleAddProduct,
  handleFindProducts,
  handleFindProductById,
  handleEditProduct,
  handleRateProduct,
  handleDeleteProductById,
  handleGetCategories,
  handleGetColors,
};
