const mongoose = require("mongoose");

const { Schema } = mongoose;

const ColorSchema = new Schema(
  {
    slug: {
      type: String,
      required: ["Color slug is required"],
    },
    value: {
      type: String,
      required: ["Color value is required"],
    },
  },
  { timestamps: true }
);

const ColorModel = mongoose.model("Color", ColorSchema);

module.exports = {
  ColorModel,
  ColorSchema,
};
