import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import ajax from 'superagent';

import SERVER_URL from '../config';
import '../css/order.css';

import { OrderAddress, NewAddress } from './OrderAddress';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basket_objects: [],
            total_price: 0,
            user_addresses: [],
            order_address_id: '',
            card_details: {
                card_owner: '',
                card_number: '',
                card_expiration_date: '',
                card_code: ''
            },
            show_new_address_form: false
        };
        this.associateBaskets = this.associateBaskets.bind(this);
        this.calculateOrderPrice = this.calculateOrderPrice.bind(this);
        this.getCurrentUserAddresses = this.getCurrentUserAddresses.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveAddressID = this.saveAddressID.bind(this);
        this.compareDate = this.compareDate.bind(this);
        this.sendOrder = this.sendOrder.bind(this);
        this.showNewAddress = this.showNewAddress.bind(this);
        this.clearInputFields = this.clearInputFields.bind(this);
        this.updateBasketsAfterOrder = this.updateBasketsAfterOrder.bind(this);
    }

    associateBaskets() {
        let currentUserID = window.localStorage.getItem('profile-id');
        ajax.get(`${SERVER_URL}/basket/${currentUserID}`)
            .end((err, res) => {
                if(!err && res) {
                    let baskets = JSON.parse(res.text);
                    let to_be_ordered = baskets.filter( basket => !basket.ordered_by_current_user );
                    this.setState({
                        basket_objects: to_be_ordered
                    });
                    this.calculateOrderPrice();
                }
                else {
                    console.log("Error while retrieving basket objects");
                    this.setState({
                        basket_objects: {}
                    });
                }
            })
    }

    calculateOrderPrice() {
        let total_price = 0;
        this.state.basket_objects.map( basket => total_price += parseFloat(basket.price) );
        this.setState({
            total_price: total_price
        });
    }

    componentWillMount() {
        this.associateBaskets();
        this.getCurrentUserAddresses();
    }

    getCurrentUserAddresses() {
        let currentUserID = window.localStorage.getItem('profile-id');
        ajax.get(`${SERVER_URL}/user/addresses/${currentUserID}`)
            .end((err, res) => {
                if(!err && !!res) {
                    let addresses = JSON.parse(res.text);
                    this.setState({
                        user_addresses: addresses
                    });
                }
                else {
                    console.log('Error while retrieving user addresses');
                    this.setState({
                        user_addresses: {}
                    });
                }
            })
    }

    compareDate(str_date){
        var dt = parseInt(str_date.substring(0,2), 10);
        var mon = parseInt(str_date.substring(3,5), 10);
        var yr = parseInt(str_date.substring(6,10), 10);
        var date = new Date(yr, mon-1, dt);
        return date;
    }

    handleChange(event) {
        let card_details = {...this.state.card_details};
        if(event.target.name === 'card_expiration_date' && event.target.value.length === 10){
            card_details[event.target.name] = this.compareDate(event.target.value);
        }
        else {
            card_details[event.target.name] = event.target.value;
        }
        this.setState({ card_details: card_details});
    }

    clearInputFields() {
        let card_placeholders = {
            card_owner: '',
            card_number: '',
            card_expiration_date: '',
            card_code: '',
        };
        this.setState({ card_details: card_placeholders });
    }

    updateBasketsAfterOrder() {
        let currentUserID = window.localStorage.getItem('profile-id');
        ajax.post(`${SERVER_URL}/basket/${currentUserID}`)
            .send({
                ordered_by_current_user: true
            })
            .end((err, baskets) => {
                if(!err && !!baskets) {
                    console.log(baskets);
                }
                else {
                    console.log(err);
                }
            })
    }

    sendOrder() {
        let currentUserID = window.localStorage.getItem('profile-id');
        let price = this.state.total_price;
        let address = this.state.order_address_id;
        let baskets = this.state.basket_objects;
        let card_number = this.state.card_details.card_number;
        let card_expiration_date = this.state.card_details.card_expiration_date;
        let card_code = this.state.card_details.card_code;
        let card_owner = this.state.card_details.card_owner;

        ajax.post(`${SERVER_URL}/order/`)
            .send({
                baskets: baskets,
                price: price,
                user_id: currentUserID,
                address: address,
                card_number: card_number,
                card_expiration_date: card_expiration_date,
                card_code: card_code,
                card_owner: card_owner
            })
            .end((err, order) => {
                if(!err && !!order) {
                    console.log(order);
                    this.clearInputFields();
                    this.updateBasketsAfterOrder();
                    browserHistory.push('/successful_order');
                }
                else {
                    console.log(err);
                }
            })
    }

    saveAddressID(event) {
        this.setState({
            order_address_id: event.target.value
        });
    }

    showNewAddress() {
        if (this.state.show_new_address_form) {
            this.setState({
                show_new_address_form: false
            });
        }
        else {
            this.setState({
                show_new_address_form: true
            });
        }
    }

    render() {
        const addresses = this.state.user_addresses.map( (address, index) => {
            return (
                <div className="order-address-wrapper" key={index}>
                    <input className="order-address"
                        name="address_select"
                        type="radio"
                        value={address._id}
                        checked={this.state.order_address_id === address._id}
                        onChange={this.saveAddressID} />
                    <OrderAddress address={address} />
                    <br />
                </div>
            );
        });

        return (
            <div className="row order-wrapper">
                <div className="col-xs-12">
                    <h2 className="order-title">CHECKOUT</h2>
                </div>
                <div className="col-xs-12 address-wrapper">
                    <h2 className="address-title">Choose Address</h2>
                    <div className="line"></div>
                    <div className="address-details">
                        <form>
                            {addresses}
                        </form>
                        <button className="new-address-btn" onClick={this.showNewAddress}>New Address</button>
                        {this.state.show_new_address_form && <NewAddress updateAddresses={this.getCurrentUserAddresses} /> }
                    </div>
                </div>
                <div className="col-xs-12 address-wrapper">
                    <h2 className="address-title">Payment Details</h2>
                    <div className="line"></div>
                    <div className="address-details">
                        <form onSubmit={this.updateCardDetails}>
                            <div className="form-group">
                                <label htmlFor="owner">Card Owner: </label>
                                <input type="card_owner"
                                    name="card_owner"
                                    value={this.state.card_details.card_owner}
                                    onChange={this.handleChange}
                                    id="owner"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exp-date">Expire Date: </label>
                                <input type="exp-date"
                                    name="card_expiration_date"
                                    value={this.state.card_details.card_expiration_date}
                                    onChange={this.handleChange}
                                    placeholder="dd-mm-yy"
                                    id="exp-date"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="number">Card Number: </label>
                                <input type="number"
                                    name="card_number"
                                    value={this.state.card_details.card_number}
                                    onChange={this.handleChange}
                                    id="number"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="code">3-digit Code: </label>
                                <input type="number"
                                    name="card_code"
                                    value={this.state.card_details.card_code}
                                    onChange={this.handleChange}
                                    id="code"
                                    className="form-control" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row submit-order">
                    <p className="col-xs-6 total-price">Total Price: {this.state.total_price}$</p>
                    <button className="col-xs-6 order-button" onClick={this.sendOrder}>Submit Order</button>
                </div>
            </div>
        );
    }
}

class SuccessOrder extends Component {

    constructor(props) {
        super(props);
        this.homeRedirect = this.homeRedirect.bind(this);
    }

    homeRedirect() {
        setTimeout(function() { browserHistory.push('/'); }.bind(this), 3000);
    }

    componentDidMount() {
        this.homeRedirect()
    }

    render() {
        return (
            <div className="row order-wrapper">
                <div className="col-xs-12">
                    <h2 className="order-title">ORDER COMPLETED</h2>
                </div>
                <p className="success-order">Your order was successfully submited! Redirecting to main page...</p>
            </div>
        );
    }
}

export { Order, SuccessOrder };
