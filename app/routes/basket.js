var express = require('express');
var Basket = require('../models/basket');
//var Product = require('../models/product');

module.exports = function() {
    let basketRouting = express.Router();

    basketRouting.get('/:user_id', function(req, res){
        // Basket.find({
        //     '
        // }, function(err, products){
        //     if (!!err) {
        //         res.send(err);
        //     }
        //     else if (!!products) {
        //         res.send(products);
        //     }
        //     else {
        //         res.send({
        //             "msg": "No products in current user's basket"
        //         });
        //     }
        // });
        Basket.find({
            'user_id': req.params['user_id']
        }).populate('product')
        .exec(function(err, basket) {
            if(!err && !!basket) {
                res.send(basket);
            }
            else {
                res.send([]);
            }
        })
    });

    basketRouting.post('/', function(req, res){
        let basket = new Basket({
            user_id: req.body.user_id,
            product: req.body.product,
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

    basketRouting.get('/products/:product_id', function(req, res){
        Basket.find({
            'product_id': req.params.product_id
        }).populate('product_id')
        .exec(function(err, basket) {
            if(!err && !!basket) {
                res.send(basket);
            }
            else {
                res.send([]);
            }
        })
    });

    return basketRouting;
}
