const {Schema, model} = require('mongoose');
const { moduleConfig } = require('../lib');

const productModel = model('Product', new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        max: 500
    },
    short_desc: {
        type: String,
        required: true,
        maxLength: 200

    },
    price: {
        type: Number,
        required: true
    },
    disc_price:{
        type: Number,
        default: 0
        
    },
    images:{
        type:[String],
        required: true
    },
    category_id :{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Category'
    },
    brand_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Brand'
    },
    status: {
        type: Boolean,
        required: true,
        default: true

    },
    featured: {
        type: Boolean,
        required: true,
        default: false
    }
    
},moduleConfig))

module.exports = productModel;