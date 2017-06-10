/* Node modules */
var express = require('express')

/* Static files */
var User = require('../models/user');


module.exports = function() {
	let userRoute = express.Router();


	// @TODO: to be deleted, this is just an example
	userRoute.post('/user', function(req, res) {
		let email = req.body.email;

		User.findOne({
			email: req.body.email
		}, function(err, user) {
			if (!!err) {
				res.send(err);
			} else if (!user) {
				// @TODO: To be deleted: example of user edit
				// user.name = "Valentin Georgiev"

				// user.save(function(err, user) {
				// 	if(!!err) {
				// 		res.send(err);
				// 	} else {
				// 		res.send(user);
				// 	}
				// });
				
				res.send(user);
			} else {
				res.send({
					msg: "There is not user with email " + req.body.email
				});

				// @TODO: to be deleted: example of creating new user
				// let newUser = new User({
				// 	names: "valentin",
				// 	email: "sdasdas"
				// });
				// user.save(function(err, user) {
				// 	if(!!err) {
				// 		res.send(err);
				// 	} else {
				// 		res.send(user);
				// 	}
				// });
			}
		})
	});
	return userRoute;
};





