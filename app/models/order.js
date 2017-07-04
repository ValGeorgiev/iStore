var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BasketSchema = require('./basket');

var OrderSchema = new Schema({
    baskets: {
        type: Array,
        ref: 'Basket',
        required: true
    },

    price: {
        type: String,
        required: true
    },

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    address_id: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },

    information: {
        type: String,
        required: false
    },

    status: {
        type: String,
        default: 'Processing',
        required: true
    },

    card_number: {
        type: String,
        required: false
    },

    card_expiration_date: {
        type: Date,
        required: false
    },

    card_code: {
        type: String,
        required: false
    },

    card_owner: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model('Order', OrderSchema);
