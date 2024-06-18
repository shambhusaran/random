const { Schema, model } = require("mongoose");
const { moduleConfig } = require("../lib");

const User = model(
  "User",
  new Schema(
    {
     
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
        select: false
      },

      status: {
        type: Boolean,
    
        default: true
      },

      contact: {
        type: String,
        maxLength: 20,
        required: true,
      },

      address: {
        type: String,
        required: true,
        maxLength: 30,
      },

      access: {
        type: String,
        enum: ["admin", "customer", "staff"],
        default: "customer",
      }
    },
    moduleConfig
  )
);

module.exports = User;
