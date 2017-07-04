var express = require('express');
var Order = require('../models/order');

module.exports = function() {
    let orderRouting = express.Router();

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
            res.send(_order);
        })
    })

    return orderRouting;
}
