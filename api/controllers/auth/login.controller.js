const { errorHandler, validationHandler } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginController {
  login = async (req, resp, next) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email }).select("+password");
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            {
              uid: user._id,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor((Date.now() / 1000) * 60 * 60),
            },
            process.env.JWT_SECRET
          );
          resp.send({ token });
        } else {
          validationHandler({ password: "Incorrect password" }, next);
        }
      } else {
        validationHandler({ email: "Given email is not registered" }, next);
      }
    } catch (err) {
      errorHandler(err, next);
    }
  };
}
module.exports = new LoginController();
