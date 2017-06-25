import React, { Component } from 'react';
import auth from './Auth';
import ajax from 'superagent';
import update from 'immutability-helper';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            addressTrigger: false,
            showAddressList: false,
            addresses: [],
            showAddressInfo: [],
            newAddressObject: {
                address: '',
                postal: '',
                city: '',
                country: '',
            }
        }
        this.setUserData = this.setUserData.bind(this);
        this.activateAddressForm = this.activateAddressForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitNewAddress = this.submitNewAddress.bind(this);

    }

    componentWillMount() {
        auth.getUserData(this.setUserData);
    }


    setUserData(email, firstName, lastName, type, addresses) {
        auth.checkUserType(type);

        this.setState({ 'email': email });
        this.setState({ 'firstName': firstName });
        this.setState({ 'lastName': lastName });
        this.setState({ 'addresses': addresses });

        if (this.state.addresses.length >= 1) {
            this.setState({ 'showAddressList': true })
        }
        let tmpArray = [];
        while (this.state.addresses.length !== tmpArray.length) {
            tmpArray.push(false)
        }
        this.setState({ showAddressInfo: tmpArray });

    }

    activateAddressForm() {
        this.setState({ 'addressTrigger': true });
    }

    showAddressInfo(index, trigger) {
        var tmpArray = this.state.showAddressInfo.slice();
        tmpArray[index] = trigger;
        this.setState({ showAddressInfo: tmpArray });
    }

    handleChange(event) {

        var tmpUpdates = update(this.state.newAddressObject, {
            [event.target.name]: { $set: event.target.value }
        });
        this.setState({ newAddressObject: tmpUpdates });
    }

    clearInputFields() {
        let tmp_newAddressObject = {
            address: '',
            postal: '',
            city: '',
            country: '',
        };
        this.setState({ newAddressObject: tmp_newAddressObject });
    }
    submitNewAddress(event) {
        let postParams = this.state.newAddressObject;
        postParams._id = window.localStorage.getItem('profile-id');

        ajax.post('http://localhost:3001/user/add-address')
            .send(postParams)
            .end((error, res) => {
                if (!!error) {
                    alert(error);
                } else if (res.body.success === 'success') {
                    alert(res.body.message);
                    this.clearInputFields();
                }
            })

        event.preventDefault();

    }

    render() {


        let addressesHTML;
        if (this.state.showAddressList) {
            addressesHTML = this.state.addresses.map((address, index) => {

                return (
                    <div key={index}>
                        <div>{address.address}
                            {!this.state.showAddressInfo[index] ?
                                <button onClick={this.showAddressInfo.bind(this, index, true)} >Expand</button> :
                                <button onClick={this.showAddressInfo.bind(this, index, false)} >Hide</button>}
                        </div>

                        {this.state.showAddressInfo[index] ?
                            <div>
                                <p>City: {address.city}</p>
                                <p>Country: {address.country}</p>
                                <p>Postal Code: {address.postal}</p>

                            </div> : null
                        }
                    </div>
                )
            });
        }


        return (
            <div className="container">
                <div className="row">
                    <h1 className>Profile page</h1>
                    <div className="col-md-12">
                        <p>FirstName: {this.state.firstName}</p>
                        <p>LastName: {this.state.lastName}</p>
                        <p>Email: {this.state.email}</p>
                        <p>My Address: </p>
                        {this.state.showAddressList ? <div>{addressesHTML}</div> : null}
                        <button onClick={this.activateAddressForm} >Add new Address</button>

                        {this.state.addressTrigger ?
                            <form className="form" onSubmit={this.submitNewAddress}>
                                <div className="form-group">
                                    <label htmlFor="address">Address: </label>
                                    <input type="text"
                                        id="address"
                                        className="form-control"
                                        name="address"
                                        value={this.state.newAddressObject.address}
                                        onChange={this.handleChange}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City: </label>
                                    <input type="text"
                                        id="city"
                                        className="form-control"
                                        name="city"
                                        value={this.state.newAddressObject.city}
                                        onChange={this.handleChange}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country: </label>
                                    <input type="text"
                                        id="country"
                                        className="form-control"
                                        name="country"
                                        value={this.state.newAddressObject.country}
                                        onChange={this.handleChange}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="postal">Postal: </label>
                                    <input type="text"
                                        id="postal"
                                        className="form-control"
                                        name="postal"
                                        value={this.state.newAddressObject.postal}
                                        onChange={this.handleChange}
                                        required />
                                </div>
                                <input type="submit" value="Submit" className="btn btn-default" />

                            </form>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
