var express = require('express');
var Basket = require('../models/basket');
//var Product = require('../models/product');

module.exports = function() {
    let basketRouting = express.Router();

    basketRouting.get('/:user_id', function(req, res){
        Basket.find({
            'user_id': req.params['user_id']
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

    basketRouting.post('/', function(req, res){
        let basket = new Basket({
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            color: req.body.color,
            quantity: req.body.quantity,
            price: req.body.price
        });
        basket.save(function(err, _basket) {
            if (!!err) {
                res.send(err);
                return;
            }
            res.send(_basket);
        })
    })

    return basketRouting;
}
