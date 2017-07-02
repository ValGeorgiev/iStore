/* Node modules */
var express = require('express');

/* Static files */
var Product = require('../models/product');
var User = require('../models/user');
var Comment = require('../models/comment');


module.exports = function() {
	let productRoute = express.Router();

	productRoute.get('/all/:type', function(req, res) {
		Product.find({
			category: { $in: [req.params['type']] }
		}, function(err, products) {
			if (!!err) {
				res.send(err);
			} else if (!!products) {
				res.send(products);
			} else {
				res.send({
					msg: "Products are not found"
				});
			}
		});
	});

	productRoute.get('/:id', function(req, res) {
		Product.findOne({
			_id: req.params['id']
		}, function(err, product) {
			if (!!err) {
				res.send(err);
			} else if (!!product) {
				res.send(product);
			} else {
				res.send({
					msg: "Product are not found"
				});
			}
		});
	});

	productRoute.post('/add', function(req, res) {
		let product = {
			name: req.body.name,
			description: req.body.description,
			color: req.body.color,
			category: req.body.category,
			quantity: req.body.quantity,
			price: req.body.price
		}
		product = new Product(product);
		product.save(function(err, _product) {
			if (!!err) {
				res.send(err);
				return;
			}
			res.send(_product);
		});
	});

	productRoute.post('/add/comment', function(req, res) {
		User.findOne({
			_id: req.body.user_id
		}, function(err, user) {
			if (!err && !!user) {

				Product.findOne({
					_id: req.body.product_id
				}, function(err, product) {
					if (!err && !!product) {

						let comment = new Comment({
							user: user,
							product: product,
							content: req.body.content
						});

						comment.save(function(err, _comment) {
							if (!!err) {
								res.send(err);
								return;
							}
							res.send(_comment);
						});
					} else {
						res.send({
							err: 'No product'
						});
					}
				});
			} else {
				res.send({
					err: "No user"
				});
			}
		});
	});

	productRoute.get('/comments/:id', function(req, res) {
		Comment.find({
			product: req.params.id
		}).populate('user')
		.exec(function(err, comments) {
			if (!err && !!comments) {
				res.send(comments);
			} else {
				res.send([]);
			}
		});
	});


	productRoute.delete('/comment/:productid/:id', function(req, res) {
		Comment.remove({
			_id: req.params.id
		}, function(err) {
			Comment.find({
				product: req.params.productid
			}).populate('user')
			.exec(function(err, comments) {
				if (!err && !!comments) {
					res.send(comments);
				} else {
					res.send([]);
				}
			})
		});
	});

	return productRoute;
}
