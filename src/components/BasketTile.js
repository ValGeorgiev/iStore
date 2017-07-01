import React, { Component } from 'react';
import { Link } from 'react-router'
import ajax from 'superagent';

import Product from './Product';
import SERVER_URL from '../config';
import defaultImage from '../../public/img/default_product.jpg';
import '../css/basket.css';

class BasketTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {}
        };
    }

    handleQuantityChange(event) {

    }

    /*
    render() {
        return(
            <div className="col-xs-3 product-wrapper">
                <Link to={`/product/${this.props.product.id}`}>
                    <div className="image-wrapper">
                        <img src={defaultImage} alt="default product" className="product-image"/>
                    </div>
                    <p className="product-name">{this.props.product.name}</p>
                    <p className="product-price">Price: {this.props.product.price}</p>
                </Link>
                <div className="add-wrapper">
                    <input className="pdp-product-quantity" type="text" defaultValue="1"
                                   value={this.state.quantity} onChange={this.handleQuantityChange} />
                    <button data-id={this.props.product.id} className="change-quantity">Change</button>
                    <button data-id={this.props.product.id} className="remove-products">Remove</button>
                </div>
            </div>
        );
    }
    */

    render() {
        return (
            <div className="col-xs-12 basket-product-wrapper">
                <div className="col-xs-2">
                    <Link to={`product/${this.props.product._id}`}>
                        <div className="image-wrapper">
                            <img src={defaultImage} alt="default product" className="product-image"/>
                        </div>
                    </Link>
                    <p className="basket-product-name">{this.props.product.name}</p>
                </div>
                <div className="col-xs-6 basket-description-wrapper">
                    {this.props.product.description}
                </div>
                <div className="col-xs-3 basket-qtty-wrapper">
                    {this.props.quantity}
                </div>

            </div>
        );
    }
}


export default BasketTile;
