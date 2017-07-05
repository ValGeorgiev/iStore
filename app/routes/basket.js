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
            price: req.body.price,
            ordered_by_current_user: req.body.ordered_by_current_user
        });
        basket.save(function(err, _basket) {
            if (!!err) {
                res.send(err);
                return;
            }
            res.send(_basket);
        })
    })

    basketRouting.delete('/:product_id/:user_id', function(req, res){
        Basket.remove({
            '_id': req.params['product_id']
        }, function(err) {
            Basket.find({
                'user_id': req.params['user_id']
            }).populate('product')
            .exec(function(err, basket) {
                if(!err && !!basket) {
                    console.log(`offf: ${basket}`);
                    res.send(basket);
                }
                else {
                    res.send([]);
                }
            })
        })
    });

    basketRouting.post('/:user_id', function(req, res){
        Basket.update(
            { 'user_id': req.params['user_id'] },
            { $set: {'ordered_by_current_user': req.params['ordered_by_current_user']} },
            { 'multi': true }, function(err) {
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
            }
        )
    })

    return basketRouting;
}
