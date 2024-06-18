const { errorHandler, notFoundErrorHandler } = require("../../lib");
const { Category } = require("../../models");
const bcrypt = require('bcryptjs')

class CategoryController {
    index = async (req, resp, next) => {
        try {
          let category = await Category.find();
          resp.send(category);
        } catch (err) {
          errorHandler(err, next);
        }
      };
      store = async (req, resp, next) => {
        try {
          let { name, status } = req.body;
        
            const category = await Category.create({
              name,
              status
            });
    
            resp.json({
              message: "new category created sucessfully",
            });
          
        } catch (err) {
          errorHandler(err, next);
        }
      };
    
      show = async (req, resp, next) => {
        try{
           
            const category = await Category.findOne({_id: req.params.id})
            if(category){
                resp.send(category)
            }else{
                return notFoundErrorHandler('category', next)
            }
        }
        catch(err){
            return errorHandler(err, next)
        }
      };


      update = async (req, resp, next) => {
        try{
          console.log("-----------------------------")
          console.log(req.uid)
            let {name, status} = req.body
            const category = await Category.findById(req.params.id)
            console.log(category)
            
           if(category){
          
            await Category.findByIdAndUpdate(req.params.id,{name, status})
            resp.send({
                message: "Category updated sucessfully"
            })
           }else{
            return notFoundErrorHandler('Category', next)
           }
        }catch(err){
            return errorHandler(err, next, )
        }
      };
      delete = async (req, resp, next) => {
        try{
         
          const category = await Category.findById(req.params.id)
          
         if(category){
        
          await Category.findByIdAndDelete(req.params.id)
          resp.send({
              message: "Category deleted sucessfully"
          })
         }else{
          return notFoundErrorHandler('Category', next)
         }
      }catch(err){
          return errorHandler(err, next, )
      }
    
      };

}
module.exports = new CategoryController();
