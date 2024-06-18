const { ProductController } = require("../../controllers/cms");
const { fileUpload } = require("../../authlib");

const express = require("express");

const router = express.Router();
const mimeList = ['image/jpeg', 'image/png', 'image/gif'];

router
  .route("/")
  .get(ProductController.index)
  .post(fileUpload(mimeList).array("images"), ProductController.store);

router
  .route("/:id")
  .get(ProductController.show)
  .patch(fileUpload(mimeList).array("images"), ProductController.update)
  .put(fileUpload(mimeList).array("images"), ProductController.update)
  .delete(ProductController.delete);

  router.delete('/:id/image/:filename', ProductController.deleteImage)

module.exports = router;
