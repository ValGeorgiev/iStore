import React, { Component } from 'react';
import ajax from 'superagent';
import { browserHistory } from 'react-router';

import SERVER_URL from '../config';
import '../css/orders.css';

class Orders extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    componentWillMount() {
        this.getOrders();
    }

    getOrders() {
        let currentUser = window.localStorage.getItem("profile-id");

        if (!currentUser) {
            browserHistory.push('/'); 
        }

        ajax.get(`${SERVER_URL}/order/all/${currentUser}`)
            .end((err, res) => {

                if(!err && res) {
                    let orders = JSON.parse(res.text);
                    this.setState({
                        orders: orders
                    });
                } else {
                    this.setState({
                        orders: []
                    });
                }
            });
    }

    renderProducts(order) {
        return order.baskets.map((basket) => {
            return (
                <div className="order-basket-row" key={basket._id}>
                    <p>Name: <span>{basket.product.name}</span></p>
                    <p>Price: <span>{basket.product.price}</span></p>
                    <p>Quantity: <span>{basket.quantity}</span></p>
                </div>
            )
        })
    }

    renderOrders() {
        return this.state.orders.map((or) => {
            return (
                <div className="row order-row-inner"  key={or._id}>
                    <div className="col-xs-4">
                        <p>Address: <span>{or.address_id.address}</span></p>
                        <p>City: <span>{or.address_id.city}</span></p>
                        <p>Country: <span>{or.address_id.country}</span></p>
                        <p>Postal: <span>{or.address_id.postal}</span></p>
                    </div>
                    <div className="col-xs-6">
                        {this.renderProducts(or)}
                    </div>
                    <div className="col-xs-2">
                        <p>{or.status}</p>
                    </div>
                </div>
            )
        })
    }

    render() {

        return (
            <div className="row orders-wrapper">
                <div className="col-xs-12">
                    <h2 className="order-title">Your Orders</h2>
                </div>
                <div className="col-xs-12 order-row-wrapper">
                    <div className="row order-header">
                        <div className="col-xs-4">
                            <span> Address: </span>
                        </div>
                        <div className="col-xs-6">
                            <span> Products: </span>
                        </div>
                        <div className="col-xs-2">
                            <span> Status: </span>
                        </div>
                    </div>
                    {this.renderOrders()}
                </div>
            </div>
        );
    }
}
export default Orders;
