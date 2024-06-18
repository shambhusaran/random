const { errorHandler, notFoundErrorHandler } = require("../../lib");
const { Product, Brand} = require("../../models");
const  {unlinkSync} = require('node:fs')

class ProductController {
  index = async (req, resp, next) => {
    try {
      let product = await Product.aggregate()
        .lookup({
        from: 'categories',
        localField: 'category_id',
        foreignField: "_id",
        as: 'category'
      })
        .lookup({
        from: 'brands',
        localField: 'brand_id',
        foreignField: "_id",
        as: 'brand'
      });
      console.log("inside product index")
      console.log(product)


      for(let i in product){
        product[i].category = product[i].category[0]
        product[i].brand = product[i].brand[0]
      }

      resp.send(product);
    } catch (err) {
      errorHandler(err, next);
    }
  };

  store = async (req, resp, next) => {
    try {
      let {
        name,
        desc,
        short_desc,
        price,
        disc_price,
        category_id,
        brand_id,
        status,
        feadtured,
      } = req.body;
      const images = req.files.map((file) => file.filename);
      const product = await Product.create({
        name,
        desc,
        short_desc,
        price,
        disc_price,
        images,
        category_id,
        brand_id,
        status,
        feadtured,
      });
      resp.json({
        message: "new product created sucessfully",
      });
    } catch (err) {
      console.log(err)
      errorHandler(err, next);
    }
  };

  show = async (req, resp, next) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      if (product) {
        resp.send(product);
      } else {
        return notFoundErrorHandler("Product", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  update = async (req, resp, next) => {
    try {
      let {
        name,
        desc,
        short_desc,
        price,
        disc_price,
        category_id,
        brand_id,
        status,
        feadtured,
      } = req.body;
      const product = await Product.findById(req.params.id);
      let images = product.images
      if(req.files?.length>0){
        const temp = req.files.map(file=>file.filename)
        images = [...images, ...temp]
      }
    
      if (product) {
        await Product.findByIdAndUpdate(req.params.id, {
          name,
          desc,
          short_desc,
          price,
          disc_price,
          images,
          category_id,
          brand_id,
          status,
          feadtured,
        });
        resp.send({
          message: "Product updated sucessfully",
        });
      } else {
        return notFoundErrorHandler("Product", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };

  delete = async (req, resp, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (product) {
        for(let image of product.images){
           unlinkSync(`uploads/${image}`)
        }
        await Product.findByIdAndDelete(req.params.id);
        resp.send({
          message: "Product deleted sucessfully",
        });
      } else {
        return notFoundErrorHandler("Product", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }
  };

   deleteImage = async (req, resp, next)=>{
    try {
      const product = await Product.findById(req.params.id);

      if (product) {
        let images = product.images.filter(image=>image!= req.params.filename)
        unlinkSync(`uploads/${req.params.filename}`)
        await Product.findByIdAndUpdate(req.params.id, {images});
        resp.send({
          message: "Product image deleted sucessfully",
        });
      } else {
        return notFoundErrorHandler("Product", next);
      }
    } catch (err) {
      return errorHandler(err, next);
    }

  }
}

module.exports = new ProductController();
