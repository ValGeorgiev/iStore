var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BasketSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    color: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },

    price: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Basket', BasketSchema);
