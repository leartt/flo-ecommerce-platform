const { CategoryModel } = require("../models/category.model");
const { ColorModel } = require("../models/color.model");
const { ProductModel } = require("../models/product.model");

const addProduct = async ({ product, files }) => {
  const images = files.map((file) => file.path);

  // eslint-disable-next-line

  const newProduct = new ProductModel({
    ...product,
    categories: product.categories.map((c) => JSON.parse(c)),
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
  const product = await ProductModel.findById(id).populate({
    path: "ratings",
    populate: {
      path: "userId",
      model: "User",
      select: "firstName lastName",
    },
  });
  return product;
};

const editProduct = async ({ id, newData, files }) => {
  let productNewData = newData;
  if (files && files.length > 0) {
    productNewData = {
      ...newData,
      images: files.map((file) => file.path),
    };
  }

  const product = await ProductModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...productNewData,
        categories: productNewData.categories.map((c) => JSON.parse(c)),
      },
    },
    { new: true }
  );
  return product;
};

const deleteProductById = async (id) => {
  await ProductModel.findOneAndDelete({ _id: id });
};

const rateProduct = async ({ productId, userId, ratingValue }) => {
  let product = await ProductModel.findOne({ _id: productId });

  if (!product) return undefined;

  console.log(product.ratings.map((rating) => rating));

  /* a user can give only one rating to a product */

  const foundUserRating = product.ratings.find((rating) =>
    rating.userId.equals(userId)
  );

  if (foundUserRating) {
    product = await ProductModel.findOneAndUpdate(
      { _id: productId, "ratings.userId": userId },
      {
        $set: {
          "ratings.$.value": ratingValue,
        },
      },
      { new: true }
    );
  } else {
    product = ProductModel.findOneAndUpdate(
      { _id: productId },
      {
        $push: {
          ratings: { userId, value: ratingValue },
        },
      },
      { new: true }
    );
  }

  product = await product.populate({
    path: "ratings",
    populate: {
      path: "userId",
      model: "User",
      select: "firstName lastName",
    },
  });

  return product;
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
  editProduct,
  deleteProductById,
  rateProduct,
  getCategories,
  getColors,
};
