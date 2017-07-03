import React, { Component } from 'react';
import ajax from 'superagent';

import SERVER_URL from '../config';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            quantity: this.props.quantity
        };
        this.addToBasket = this.addToBasket.bind(this);
    }

    deleteMessage() {
        let that = this;
        setTimeout(() => {
            that.setState({
                message: ''
            });
        }, 3000)
    }

    addToBasket() {
        let product = this.props.product;
        let currentUserId = window.localStorage.getItem('profile-id');

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
                    this.setState({
                        message: "This product is added successfully!"
                    })
                    this.deleteMessage();
                }
                else {
                    this.setState({
                        message: "There is something wrong! Please, try again after page reload"
                    })
                }
            });
    }

    render() {
        return (
            <div className="pdp-add-wrapper">
                <input className="pdp-product-quantity" type="text"
                    value={this.props.quantity} onChange={this.props.handleQuantityChange} />
                <button data-id={this.props.product._id} onClick={this.addToBasket} className="pdp-add-product">Add Product</button>
                <p className="product-message">{this.state.message}</p>
            </div>
        )
    }
}



export default AddProduct;
