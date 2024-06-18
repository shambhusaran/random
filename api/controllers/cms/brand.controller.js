const { errorHandler, notFoundErrorHandler } = require("../../lib");
const { Brand } = require("../../models");
const bcrypt = require("bcryptjs");

class BrandController {
  index = async (req, resp, next) => {
    try {
      let brand = await Brand.find();
      resp.send(brand);
    } catch (err) {
      errorHandler(err, next);
    }
  };
  store = async (req, resp, next) => {
    try {
      let { name, status } = req.body;

      const brand = await Brand.create({
        name,
        status,
      });
      resp.json({
        message: "new brand created sucessfully",
      });
    } catch (err) {
      errorHandler(err, next);
    }
  };

  show = async (req, resp, next) => {
    try {
      const brand = await Brand.findOne({ _id: req.params.id });
      if (brand) {
        resp.send(brand);
      } else {
        return notFoundErrorHandler("Brand", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  update = async (req, resp, next) => {
    try {
      let { name, status } = req.body;
      const brand = await Brand.findById(req.params.id);
      if (brand) {
        await Brand.findByIdAndUpdate(req.params.id, { name, status });
        resp.send({
          message: "Brand updated sucessfully",
        });
      } else {
        return notFoundErrorHandler("Brand", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };
  delete = async (req, resp, next) => {
    try {
      const brand = await Brand.findById(req.params.id);

      if (brand) {
        await Brand.findByIdAndDelete(req.params.id);
        resp.send({
          message: "Brand deleted sucessfully",
        });
      } else {
        return notFoundErrorHandler("Brand", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };
}
module.exports = new BrandController();

