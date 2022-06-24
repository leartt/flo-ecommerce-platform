const ProductModel = require("../models/product.model");

const addProduct = async (product) => {
  const newProduct = new ProductModel(product);
  await newProduct.save();
  return newProduct;
};

const findProducts = async () => {
  const products = await ProductModel.find();
  return products;
};

const findProductById = async (id) => {
  const product = await ProductModel.findById(id);
  return product;
};

const deleteProductById = async (id) => {
  await ProductModel.findOneAndDelete({ _id: id });
};

module.exports = {
  addProduct,
  findProducts,
  findProductById,
  deleteProductById,
};
