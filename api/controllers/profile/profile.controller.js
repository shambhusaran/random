const { errorHandler, validationHandler } = require("../../lib");
const { User, Review, Order, Product } = require("../../models");
const bcrypt = require("bcryptjs");
const { Types } = require("mongoose");

class ProfileController {
  show = async (req, resp, next) => {
    try {
      console.log(req.uid);
      console.log(req.user);
      resp.send({
        user: req.user,
      });
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  update = async (req, resp, next) => {
    try {
      let { name, contact, address } = req.body;
      await User.findByIdAndUpdate(req.uid, {
        name,
        contact,
        address,
      });
      resp.send({
        message: "Profile updated sucessfully",
      });
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  //to change the current password
  updatePassword = async (req, resp, next) => {
    try {
      let { oldPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.uid).select("+password");
      if (bcrypt.compareSync(oldPassword, user.password)) {
        if (newPassword === confirmPassword) {
          const hash = bcrypt.hashSync(newPassword);
          await user.updateOne({ password: hash });
          resp.send({ message: "Password updated sucessfully" });
        } else {
          return validationHandler(
            {
              password: "password not confirmed",
            },
            next
          );
        }
      } else {
        return validationHandler(
          { oldPassword: "Old password is incorrect" },
          next
        );
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  reviews = async (req, resp, next) => {
    try {
        let reviews = await Review.aggregate().match({user_id: new Types.ObjectId(req.uid)}).lookup(
            {from: 'products', localField: 'product_id', foreignField: '_id', as: 'product' }
        )
        for(let i in reviews){
            reviews[i].product = reviews[i].product[0]

        }
        resp.send(reviews)

    } catch (err) {
        return errorHandler(err, next)
    }
  };



  orders = async (req, resp, next) => {
    try {
      let orders = await Order.aggregate().match({user_id: new Types.ObjectId(req.uid)}).lookup(
          {from: 'orderdetails', localField: '_id', foreignField: 'order_id', as: 'details' }
      )
      for(let i in  orders){
        for(let j in orders[i].details){
        orders[i].details[j].product = await Product.findById(orders[i].details[j].product_id)
          
        }
      }
      resp.send(orders)

  } catch (err) {
      return errorHandler(err, next)
  }
  };
}

module.exports = new ProfileController();
