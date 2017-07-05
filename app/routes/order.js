var express = require('express');
var Order = require('../models/order');
var Basket = require('../models/basket');

module.exports = function() {
    let orderRouting = express.Router();

    orderRouting.get('/all/:userID', function(req, res) {
        Order.find({
            user_id: req.params.userID
        }).populate('address_id')
         .exec(function(err, orders) {
            if (!!err) {
                res.send(err);
                return;
            }
            res.send(orders);
        })
     });


    orderRouting.post('/', function(req, res) {
        let order = new Order({
            baskets: req.body.baskets,
            price: req.body.price,
            user_id: req.body.user_id,
            address_id: req.body.address,
            card_number: req.body.card_number,
            card_expiration_date: req.body.card_expiration_date,
            card_code: req.body.card_code,
            card_owner: req.body.card_owner
        });
        order.save(function(err, _order) {
            if (!!err) {
                res.send(err);
                return;
            }

            _order.baskets.map((b) => {
                Basket.findOne({
                    _id: b._id
                }, function(err, basket_product) {
                    if (!err) {

                        basket_product.ordered_by_current_user = true;
                        basket_product.save();
                    }

                })
            });

            res.send(_order);
        })
    })

    return orderRouting;
}
