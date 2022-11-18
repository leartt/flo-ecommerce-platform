const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  customerName: {
    type: String,
    required: ["Customer name is a required field"],
  },
  city: {
    type: String,
    required: ["City is a required field"],
  },
  country: {
    type: String,
    required: ["Country is a required field"],
  },
  line1: {
    type: String,
    required: ["Line 1/Street address is a required field"],
  },
  line2: {
    type: String,
  },
  postalCode: {
    type: String,
    required: ["Postal code is a required field"],
  },
});

module.exports = { AddressSchema };
