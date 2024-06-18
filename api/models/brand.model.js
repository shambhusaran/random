const {Schema, model} = require('mongoose');
const {moduleConfig} = require('../lib/index.js')



const brandModel = model('Brand', new Schema({
    name:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
    },
    moduleConfig
))

module.exports = brandModel