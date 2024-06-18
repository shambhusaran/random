const { authorize, customerAccess } = require("../../authlib");
const { Front } = require("../../controllers");

const express = require("express");

const router = express.Router();

router.get("/featured", Front.ProductController.featured);
router.get("/latest", Front.ProductController.latest);
router.get("/top-selling", Front.ProductController.top);
router.get("/search", Front.ProductController.search);
router.get("/:id", Front.ProductController.byID);
router.get("/:id/similar", Front.ProductController.similar);
router.post("/:id/reviews",authorize, customerAccess, Front.ProductController.review);

module.exports = router;
