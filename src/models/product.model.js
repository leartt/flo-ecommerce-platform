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
    specifications: {
      cpu: { type: String },
      gpu: { type: String },
      ram: { type: String },
      size: { type: String },
      storage: { type: String },
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
    releaseDate: {
      type: String,
      required: ["Product release date is required"],
    },
    color: {
      type: ColorSchema,
    },
    categories: {
      type: [CategorySchema],
    },
    ratings: {
      type: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            required: ["Rating user id is required"],
          },
          value: {
            type: Number,
            required: ["Product rating value is required"],
            min: 0,
            max: 5,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = { ProductModel, ProductSchema };
