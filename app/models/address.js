var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    postal: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model('Address', AddressSchema);