import React, { Component } from 'react';
import ajax from 'superagent';

import Product from './Product';
import BasketTile from './BasketTile';
import SERVER_URL from '../config';

class BasketGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            added_products: []
        };
        this.getBasketProducts = this.getBasketProducts.bind(this);
    }

    getBasketProducts() {
        let currentUser = window.localStorage.getItem("profile-id");
        currentUser = JSON.parse(currentUser);
        ajax.get(SERVER_URL + '/basket/' + currentUser)
            .end((err, res) => {
                if(!err && res) {
                    let products = JSON.parse(res.text);
                    this.setState({
                        added_products: products
                    });
                }
                else {
                    console.log("Error while retrieving products in basket");
                    this.setState({
                        added_products: []
                    });
                }
            })
    }

    componentDidMount(){
        this.getBasketProducts()
    }

    removeFromBasket() {
        //TODO
    }

    /*
    render() {
        const basket_products = this.state.added_products.map(product => {
            return (< BasketTile key={product._id} product={product} />);
        });
        return (
            <div className="row products-wrapper">
                <div className="col-xs-12">
                    <h2 className="products-title">Basket</h2>
                </div>
                {basket_products}
            </div>
        );
    }
    */

    render() {
        const basket_products = this.state.added_products.map(product => {
            return (< BasketTile key={product._id} product={product} />);
        });

        return (
            <div className="shopping-cart">
                <div className="title">
                    Basket
                </div>
                {basket_products}
            </div>
        );
    }
}

export default BasketGrid;
