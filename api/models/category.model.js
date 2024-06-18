const {Schema, model} = require('mongoose')
const {moduleConfig} = require('../lib')



const categoryModel = model('Category', new Schema({
    name : {
        type: String,
        required: true
    },
    status : {
        type: Boolean,
        required: true,
        default: true
    }
},
moduleConfig
));

module.exports = categoryModel