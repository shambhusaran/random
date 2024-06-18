const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { errorHandler } = require("../../lib");

class RegisterController {
  register = async (req, resp, next) => {
    try {
      let { name, email, password, confirmPassword, contact, address } =
        req.body;
      if (password == confirmPassword) {
        let hashedPW = bcrypt.hashSync(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedPW,
          contact,
          address,
        });

        resp.json({
          message: "registration completed please proceed to login",
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
}
module.exports = new RegisterController();
