const mongoose = require("mongoose");
const { CategorySchema } = require("./category.model");
const { ColorSchema } = require("./color.model");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: ["Product name is required"],
    },
    title: {
      type: String,
      required: ["Product title is required"],
    },
    shortDesc: {
      type: String,
      required: ["Product short description is required"],
    },
    longDesc: {
      type: String,
      required: ["Product long description is required"],
    },
    price: {
      type: Number,
      required: ["Product price is required"],
    },
    images: {
      type: [String],
      required: ["Product image is required"],
    },
    color: {
      type: ColorSchema,
    },
    categories: {
      type: [CategorySchema],
    },
    ratings: [Number],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
