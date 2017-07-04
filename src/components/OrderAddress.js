import React, { Component } from 'react';
import ajax from 'superagent';

import SERVER_URL from '../config';
import '../css/order.css';

class NewAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            new_address: {
                address: '',
                postal: '',
                city: '',
                country: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitNewAddress = this.submitNewAddress.bind(this);
        this.clearInputFields = this.clearInputFields.bind(this);
    }

    handleChange(event) {
        let new_address = {...this.state.new_address};
        new_address[event.target.name] = event.target.value;
        this.setState({
            new_address: new_address
        });
    }

    clearInputFields() {
        let default_address = {
            address: '',
            postal: '',
            city: '',
            country: '',
        };
        this.setState({ new_address: default_address });
    }

    submitNewAddress(event) {
        event.preventDefault();
        let new_address = {...this.state.new_address};
        new_address._id = window.localStorage.getItem('profile-id');
        ajax.post(SERVER_URL + '/user/add-address')
            .send(new_address)
            .end((err, res) => {
                if (!!err) {
                    console.log(err);
                }
                else {
                    console.log(res);
                    this.props.updateAddresses();
                    this.clearInputFields();
                }
            })
    }

    render(){
        return(
            <div className="new-address">
                <form className="form" onSubmit={this.submitNewAddress}>
                    <div className="form-group">
                        <label htmlFor="address">Address: </label>
                        <input type="text"
                            id="address"
                            className="form-control"
                            name="address"
                            value={this.state.new_address.address}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City: </label>
                        <input type="text"
                            id="city"
                            className="form-control"
                            name="city"
                            value={this.state.new_address.city}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country: </label>
                        <input type="text"
                            id="country"
                            className="form-control"
                            name="country"
                            value={this.state.new_address.country}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postal">Postal: </label>
                        <input type="text"
                            id="postal"
                            className="form-control"
                            name="postal"
                            value={this.state.new_address.postal}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <input type="submit" value="Submit" className="btn btn-default" />
                </form>
          </div>
        );
    }
}


function OrderAddress(props) {

    return (
        <div className="col-xs-10 order-address">
            <div className="address">{props.address.address}</div>
            <div className="address">{props.address.city}</div>
            <div className="address">{props.address.country}</div>
            <div className="address">{props.address.postal}</div>
        </div>
    );

}

export {
    NewAddress,
    OrderAddress
};
