/* Node modules */
var express = require('express');

/* Static files */
var Product = require('../models/product');


module.exports = function() {
	let productRoute = express.Router();

	productRoute.get('/:product', function(req, res) {
		Product.find({
			category: { $in: [req.params['product']] }
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

	productRoute.post('/add', function(req, res) {
		let product = {
			name: req.body.name,
			description: req.body.description,
			color: req.body.color,
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
	})
	
	return productRoute;
}