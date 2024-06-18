const {Schema, model }= require('mongoose')
const {modelConfig} = require('../lib')



const orderDetailModel = model('Orderdetail', new Schema ({
    order_id : {
        type: String,
        required: true,
    },
    product_id : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'  
    },
    price: {
        type: Number, 
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    total : {
        type: Number, 
        required: true
    }
}, 
modelConfig

))

module.exports = orderDetailModel;