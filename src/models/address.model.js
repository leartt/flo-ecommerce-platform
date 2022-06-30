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
  street: {
    type: String,
    required: ["Street is a required field"],
  },
  zipCode: {
    type: String,
    required: ["Zip Code is a required field"],
  },
});

module.exports = { AddressSchema };
