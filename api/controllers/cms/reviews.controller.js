const { errorHandler } = require("../../lib");
const { Review } = require("../../models");

class ReviewsController {
  index = async (req, resp, next) => {
    try {
        let reviews = await Review.aggregate().lookup({from: 'products', localField: 'product_id', foreignField: '_id', as: 'product'})
        .lookup({from: 'users', localField: 'user_id', foreignField:'_id', as: 'user' })

        for(let i in reviews){
            reviews[i].product = reviews[i].product[0]
            reviews[i].user = reviews[i].user[0]
        }
        resp.send(reviews)
    } catch (err) {
        return errorHandler(err, next);
    }  };
  destroy = async (req, resp, next) => {
    try {
        await Review.findByIdAndDelete(req.params.id)

        resp.send({
            message: "Review deleted sucessfully"
        })
        
    } catch (err) {
        return errorHandler(err, next)
        
    }
  };
}
module.exports = new ReviewsController;
