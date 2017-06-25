var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId, 
		ref: 'Product'
	},
	content: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}
});


module.exports = mongoose.model('Comment', CommentSchema);