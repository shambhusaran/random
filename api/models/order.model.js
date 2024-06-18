const {Schema, model} = require('mongoose');
const { moduleConfig } = require('../lib');


const ordersModel = model ('Order', new Schema ({
    user_id :  {
        type: Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    status: { 
        type: String,
        enum:  ['processing', 'confirmed', 'shipping', 'delivered', 'cancelled'],
        default: 'processing'
    }
}, moduleConfig))
module.exports= ordersModel;