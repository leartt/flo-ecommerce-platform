const { CategoryModel } = require("../models/category.model");
const { ColorModel } = require("../models/color.model");
const ProductModel = require("../models/product.model");

const addProduct = async ({ product, files }) => {
  const images = files.map((file) => file.path);
  const newProduct = new ProductModel({
    ...product,
    images,
  });
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

const getCategories = async () => {
  const categories = await CategoryModel.find();
  return categories;
};

const getColors = async () => {
  const colors = await ColorModel.find();
  return colors;
};

module.exports = {
  addProduct,
  findProducts,
  findProductById,
  deleteProductById,
  getCategories,
  getColors,
};
