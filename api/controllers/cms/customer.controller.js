const { errorHandler, notFoundErrorHandler } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require('bcryptjs')

class CustomerController {
  index = async (req, resp, next) => {
    try {
      let customer = await User.find({ access: "customer" }).exec();
      resp.send(customer);
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
          access : "customer",
          status
        });
              
        resp.json({
          message: "new customer created sucessfully",
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
    try{
       
        const user = await User.findOne({_id: req.params.id, access: "customer"})
        if(user){
            resp.send(user)
        }else{
            return notFoundErrorHandler('customer', next)
        }
    }
    catch(err){
        return errorHandler(err, next)
    }
  };
  update = async (req, resp, next) => {
    try{
        let {name,email, contact, address, status} = req.body
        const user = await User.findById(req.params.id)
        console.log(user)
       if(user && user.access == "customer"){
      
        await User.findByIdAndUpdate(req.params.id,{name, email, contact, address, status})
        resp.send({
            message: "Customer updated sucessfully"
        })
       }else{
        return notFoundErrorHandler('Customer', next)
       }
    }catch(err){
        return errorHandler(err, next, )
    }
  };
  delete = async (req, resp, next) => {
    try{
     
      const user = await User.findById(req.uid)
      console.log(user)
     if(user && user.access == "customer"){
    
      await User.findByIdAndDelete(req.params.id)
      resp.send({
          message: "Customer deleted sucessfully"
      })
     }else{
      return notFoundErrorHandler('Customer', next)
     }
  }catch(err){
      return errorHandler(err, next, )
  }

  };
}
module.exports = new CustomerController();
