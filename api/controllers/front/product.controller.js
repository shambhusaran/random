const { errorHandler, notFoundErrorHandler } = require("../../lib");
const { Product, Review, Brand } = require("../../models");
const { mongoose, Types } = require("mongoose");
const { ObjectId } = require("mongodb");
const { brands } = require("./misc.controller");

class ProductController {
  featured = async (req, resp, next) => {
    try {
      let products = await Product.find({ featured: true, status: true }).limit(
        4
      );
      resp.send(products);
    } catch (err) {
      errorHandler(err, next);
    }
  };
  latest = async (req, resp, next) => {
    try {
      let products = await Product.find({ status: true })
        .limit(4)
        .sort({ createdAt: "desc" });
      resp.send(products);
    } catch (err) {
      errorHandler(err, next);
    }
  };
  top = async (req, resp, next) => {
    try {
      let products = await Product.aggregate()
        .lookup({
          from: "orderdetails",
          localField: "_id",
          foreignField: "product_id",
          as: "orderdetails",
        })
        .addFields({
          orderdetails: { $size: "$orderdetails" },
        })
        .sort("orderdetails desc");
      resp.send(products);
    } catch (err) {
      errorHandler(err, next);
    }
  };

  byID = async (req, resp, next) => {
    try {
      const products = await Product.findOne({_id: req.params.id, status: true});
      if (products) {

        const brand = await Brand.findById(products.brand_id)
        const reviews = await Review.aggregate()
          .match({ product_id: Types.ObjectId.createFromHexString(req.params.id) })
          .lookup({
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          });
        let newList = [];
        for (let i in reviews) {
          newList.push({
            ...reviews[i],
          user:  {
            ...reviews[i].user[0],
            password: undefined
           }
          });
        }
        resp.send({ ...products.toObject, reviews: newList, brand});
      } else {
        return notFoundErrorHandler("Products", next);
      }
    } catch (err) {
      errorHandler(err, next);
    }
    // similar = async(req, resp, next)
  };

  similar = async (req, resp, next) => {
    try {
      const product = await Product.findById(req.params.id);

      const similar = await Product.find({
        category_id: product.category_id,
        _id: { $ne: product._id },
        status: true
      });
      resp.send(similar);
    } catch (err) {
      errorHandler(err, next);
    }
  };

  review = async (req, resp, next) => {
    try {
      const product = await Product.findOne({_id: req.params.id, status: true});
      if (product) {
        const { comment, rating } = req.body;
        await Review.create({
          comment,
          rating,
          product_id: req.params.id,
          user_id: req.uid,
        });
        resp.send({
          message: "Thank you for your review",
        });
      } else {
        return notFoundErrorHandler("Product", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };

search = async(req, resp, next)=>{
    try {
        const {term} = req.query
        const products = await Product.find({
            name: {$regex: term, $options: 'i'},
            status: true
        })
        resp.send(products)
        
    } catch (err) {
        errorHandler(err, next)

        
    }
}


}

module.exports = new ProductController();
