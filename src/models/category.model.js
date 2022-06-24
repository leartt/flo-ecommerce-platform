const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: ["Category name is required"],
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = {
  CategoryModel,
  CategorySchema,
};
