
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const authorize = async (req, resp, next) => {
  try {
    if ("authorization" in req.headers) {
      const token = req.headers["authorization"].split(" ").pop();
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.uid);

      if (user) {
        req.uid = user._id;
        req.user = user;
        next();
      } else {
        return next({
          message: "Invalid authentication token",
          status: 401
        });
      }
    } else {
      return next({
        message: "Authentication token missing",
        status: 401
      });
    }
  } catch (err) {
    return next({
      message: "Invalid authentication token",
      status: 401
    });
  }
};

const cmsAccess = async (req, resp, next) => {
  if (req.user.access === "customer") {
    return next({
      message: "access denied",
      status: 403,
    });
  } else {
    next();
  }
};

const adminAccess = async (req, resp, next) => {
  if (req.user.access === "staff") {
    return next({
      message: "access denied",
      status: 403,
    });
  } else {
    next();
  }
};
const customerAccess = async (req, resp, next) => {
  if (req.user.access != "customer") {
    return next({
      message: "access denied",
      status: 403,
    });
  } else {
    next();
  }
};

const fileUpload = (mimeList = []) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./uploads");
      },
      filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        const filename =
          "file" + Date.now() + "-" + Math.round(Math.random() * 1e9)+`.${ext}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (mimeList.length > 0) {
        if (mimeList.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb("File type not supported", false);
        }
      }else{
        cb(null, true)
      }
    },
  });
module.exports = { authorize, cmsAccess, adminAccess, fileUpload, customerAccess };
