const { errorHandler, notFoundErrorHandler } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

class StaffsController {
  index = async (req, resp, next) => {
    try {
      let staffs = await User.find({ access: "staff" }).exec();
      resp.send(staffs);
    } catch (err) {
      errorHandler(err, next);
    }
  };
  
  store = async (req, resp, next) => {
    try {
      let { name, email, password, confirmPassword, contact, address, status } =
        req.body;
      if (password == confirmPassword) {
        let hashedPW = bcrypt.hashSync(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedPW,
          contact,
          address,
          access: "staff",
          status
        });
        
        resp.json({
          message: "new staff created sucessfully",
        });
      } else {
        return next({
          message: "Validation error occured",
          errors: {
            password: "password not confirmed",
          },
          status: 422,
        });
      }
    } catch (err) {
      errorHandler(err, next);
    }
  };

  show = async (req, resp, next) => {
    try {
      const user = await User.findOne({ _id: req.params.id, access: "staff" });
      if (user) {
        resp.send(user);
      } else {
        return notFoundErrorHandler("Staff", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  update = async (req, resp, next) => {
    try {
      let { name, email, contact, address, status } = req.body;
      const user = await User.findById(req.params.id);
      console.log(user);
      if (user && user.access == "staff") {
        await User.findByIdAndUpdate(req.params.id, {
          name,
          email,
          contact,
          address,
          status,
        });
        resp.send({
          message: "Staff updated sucessfully",
        });
      } else {
        return notFoundErrorHandler("Staff", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };
  delete = async (req, resp, next) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      if (user&& user.access=="staff") {
        await User.findByIdAndDelete(req.params.id);
        resp.send({
          message: "Staff deleted sucessfully",
        });
      } else {
        return notFoundErrorHandler("Staff", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };
}
module.exports = new StaffsController();
