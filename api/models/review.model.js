const { Schema, model } = require("mongoose");
const { moduleConfig } = require("../lib");


const reviewModel = model("Review", new Schema(
    {
      comment: {
        type: [],
      },
      rating: {
        type: Number,
        required: true,
        min:1,
        max:5
      },
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Product'
      },
    },
    moduleConfig
  ));
  
module.exports = reviewModel;
