import React, { Component } from 'react';
import ajax from 'superagent';

import SERVER_URL from '../config';

class RemoveProduct extends Component {
    constructor(props) {
        super(props);
        this.removeFromBasket = this.removeFromBasket.bind(this);
    }

    removeFromBasket() {
        let currentUserID = window.localStorage.getItem('profile-id');
        console.log(this.props.basket_id);
        ajax.delete(`${SERVER_URL}/basket/${this.props.basket_id}/${currentUserID}`)
            .end((err, res) => {
                if(!err && !!res) {
                    let updated_basket_products = JSON.parse(res.text);
                    console.log(updated_basket_products);
                    this.props.refresh_prs(updated_basket_products);
                }
                else {
                    console.log(err);
                }
            })
    }

    render() {
        return (
            <div className="col-xs-1 basket-removal-wrapper">
                {this.props.price}
                <button data-id={this.props.product} onClick={this.removeFromBasket}>Remove</button>
            </div>
        )
    }
}

export default RemoveProduct;
