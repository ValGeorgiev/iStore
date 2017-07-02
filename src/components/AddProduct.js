import React, { Component } from 'react';
import ajax from 'superagent';

import SERVER_URL from '../config';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.addToBasket = this.addToBasket.bind(this);
    }

    addToBasket() {
        let product = this.props.product;
        let currentUserId = window.localStorage.getItem('profile-id');
        //currentUserId = JSON.parse(currentUserId);;
        ajax.post(SERVER_URL + '/basket/')
            .send({
                user_id: currentUserId,
                product: product._id,
                color: product.color,
                quantity: this.props.quantity,
                price: product.price
            })
            .end((err, product) => {
                if(!err && product) {
                    console.log(product);
                }
                else {
                    console.log(err);
                }
            });
    }

    render() {
        return (
            <div className="pdp-add-wrapper">
                <input className="pdp-product-quantity" type="text"
                    value={this.props.quantity} onChange={this.props.handleQuantityChange} />
                <button data-id={this.props.product._id} onClick={this.addToBasket} className="pdp-add-product">Add Product</button>
            </div>
        )
    }
}



export default AddProduct;
