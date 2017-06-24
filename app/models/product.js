var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    color: {
        type: [String]
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    price: {
        type: String
    },
    category: {
        type: [String]
    }
});


module.exports = mongoose.model('Product', ProductSchema);