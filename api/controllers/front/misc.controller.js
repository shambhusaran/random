const { errorHandler, notFoundErrorHandler } = require("../../lib");
const { Category, Product, Brand, Order, Orderdetail } = require("../../models");

class MiscController {
  categories = async (req, resp, next) => {
    try {
      const categoriesList = await Category.find({ status: true });
      resp.send(categoriesList);
    } catch (err) {
      errorHandler(err, next);
    }
  };
  categoryById = async (req, resp, next) => {
    try {
      const category = await Category.findOne({
        status: true,
        _id: req.params.id,
      });
      if (category) {
        resp.send(category);
      } else {
        return notFoundErrorHandler("Category", next);
      }
    } catch (err) {
      errorHandler(err, next);
    }
  };
  categoryProducts = async (req, resp, next) => {
    try {
      const products = await Product.find({
        status: true,
        category_id: req.params.id,
      });
      resp.send(products);
    } catch (err) {
      errorHandler(err, next);
    }
  };
  brands = async (req, resp, next) => {
    try {
      const brandsList = await Brand.find({ status: true });
      resp.send(brandsList);
    } catch (err) {
      errorHandler(err, next);
    }
  };
  brandById = async (req, resp, next) => {
    try {
      const brand = await Brand.findOne({ status: true, _id: req.params.id });
      if (brand) {
        resp.send(brand);
      } else {
        return notFoundErrorHandler("Brand", next);
      }
    } catch (err) {
      errorHandler(err, next);
    }
  };
  brandProducts = async (req, resp, next) => {
    try {
      console.log("------------------------------------------------");
      console.log(req.params.id);
      const products = await Product.find({
        status: true,
        brand_id: req.params.id,
      });

      console.log(products);
      resp.send(products);
    } catch (err) {
      errorHandler(err, next);
    }
  };

  checkOut = async (req, resp, next) => {
    try {
      console.log("==================")
      console.log("This before send")
      const cart = req.body;
      const order = await Order.create({
        user_id: req.uid,
        status: "processing",
      });
      for (let item of cart) {
        const product = await Product.findById(item.product_id);

        const price =
          product.disc_price > 0 ? product.disc_price : product.price;
        const total = price * item.qty;

        await Orderdetail.create({
          product_id: item.product_id,
          order_id: order._id,
          price,
          total,
          qty: item.qty,
        });
      }
      console.log("==================")
      console.log("This before send")

      resp.send({
        message:
          "Thank you for your order. We will contact you soon for confirmation.",
      });
    } catch (err) {
      errorHandler(err, next);
    }
  };
}

module.exports = new MiscController();
