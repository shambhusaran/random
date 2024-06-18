const { errorHandler } = require("../../lib");
const { Order, User } = require("../../models");

class OrdersController {
  index = async (req, resp, next) => {
    try {
      let orders = await Order.aggregate()
        .lookup({
          from: "orderdetails",
          localField: "_id",
          foreignField: "order_id",
          as: "details",
        })
        .lookup({
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        });

      for (let i in orders) {
        orders[i].user = orders[i].user[0];

        for(let j in orders){
          for(let k in orders[j].details){
            orders[j].details[k].user = await User.findById(orders[j].details[k].user_id)

          }
        }
      }
      resp.send(orders);
    } catch (err) {
      return errorHandler(err, next);
    }
  };
  
  update = async (req, resp, next) => {
    try {
  const {status} = req.body
      await Order.findByIdAndUpdate(req.params.id, {status});

      resp.send({
        message: "Order updated sucessfully",
      });
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  destroy = async (req, resp, next) => {
    try {
      await Order.findByIdAndDelete(req.params.id);

      resp.send({
        message: "Order deleted sucessfully",
      });
    } catch (err) {
      return errorHandler(err, next);
    }
  };
}
module.exports = new OrdersController();
