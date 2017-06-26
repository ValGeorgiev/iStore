var express = require('express');
var Basket = require('../models/basket');

module.exports = function() {
    let basketRouting = express.Router();
    let currentUserId = window.localStorage.getItem('id');
    currentUserId = JSON.parse(currentUserId);

    basketRouting.get('/basket', function(req, res){
        Basket.find({
            'user_id': currentUserId
        }, function(err, products){
            if (!!err) {
                res.send(err);
            }
            else if (!!products) {
                res.send(products);
            }
            else {
                res.send({
                    "msg": "No products in current user's basket"
                });
            }
        });
    });
}
