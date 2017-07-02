import React, { Component } from 'react';
import ajax from 'superagent';
import BasketTile from './BasketTile';
import SERVER_URL from '../config';
import '../css/basket.css';

class BasketGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            added_products: []
        };
        this.getBasketProducts = this.getBasketProducts.bind(this);
        this.updateBasketProducts = this.updateBasketProducts.bind(this);
    }

    getBasketProducts() {
        let currentUser = window.localStorage.getItem("profile-id");
        //currentUser = JSON.parse(currentUser);
        ajax.get(SERVER_URL + '/basket/' + currentUser)
            .end((err, res) => {
                if(!err && res) {
                    let products = JSON.parse(res.text);
                    console.log(products)
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

    updateBasketProducts(updated_products) {
        this.setState({
            added_products: updated_products
        })
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
            return (< BasketTile key={product._id} basket_id={product._id} product={product.product} quantity={product.quantity} refresh_prs={this.updateBasketProducts} />);
        });
        console.log(this.state.added_products);

        return (
            <div className="row basket-wrapper">
                <div className="col-xs-12">
                    <h2 className="basket-title">BASKET</h2>
                </div>
                {basket_products}
                <div className="col-xs-12 basket-price">
                    All products price:
                </div>
            </div>
        );
    }
}

export default BasketGrid;
