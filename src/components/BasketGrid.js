import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
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

        if (!currentUser) {
            browserHistory.push('/'); 
        }

        ajax.get(SERVER_URL + '/basket/' + currentUser)
            .end((err, res) => {
                if(!err && res) {
                    let products = JSON.parse(res.text);
                    this.setState({
                        added_products: products
                    });
                }
                else {
                    this.setState({
                        added_products: []
                    });
                }
            })
    }

    componentDidMount(){
        this.getBasketProducts();
    }

    updateBasketProducts(updated_products) {
        this.setState({
            added_products: updated_products
        });
    }

    render() {
        let products = this.state.added_products;
        const basket_products = products.map(product => {
            return (<BasketTile key={product._id} basket_id={product._id} product={product.product} quantity={product.quantity} refresh_prs={this.updateBasketProducts}/>);
        });

        return (
            <div className="row basket-wrapper">
                <div className="col-xs-10">
                    <h2 className="basket-title">BASKET</h2>
                </div>
                <div className="col-xs-2 your-orders">
                    <Link to="/orders">Your orders</Link>
                </div>
                {basket_products.length > 0 ? basket_products : <div className="empty-basket-msg"> Sorry, your basket is empty! </div> }
                <div className="col-xs-12 basket-checkout">
                    {(basket_products.length > 0) ? (<Link to='/order'>
                        <button className="checkout-button">
                            Checkout
                        </button>
                    </Link>) : null }
                </div>
            </div>
        );
    }
}

export default BasketGrid;
