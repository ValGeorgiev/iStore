import React, { Component } from 'react';
import auth from './Auth';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            addressTrigger: false,
            address: {},
        }
        this.setUserData = this.setUserData.bind(this);
        this.activateAddressForm = this.activateAddressForm.bind(this);
    }

    componentWillMount() {
        auth.getUserData(this.setUserData);
    }


    setUserData(email, firstName, lastName, type, adrress) {
        console.log(email, firstName, lastName, type, adrress)

        auth.checkUserType(type);
        console.log(auth.isAdmin);

        this.setState({ 'email': email });
        this.setState({ 'firstName': firstName });
        this.setState({ 'lastName': lastName });
        this.setState({ 'adrress': adrress });


    }
    activateAddressForm() {

    }
    render() {

        return (
            <div className="container">
                <div className="row">
                    <h1 className>Profile page</h1>
                    <div className="col-md-12">
                        <p>FirstName: {this.state.firstName}</p>
                        <p>LastName: {this.state.lastName}</p>
                        <p>Email: {this.state.email}</p>
                        <p>My Address: </p>
                        <button onClick={this.activateAddressForm} >Add new Address</button>

                        {this.state.addressTrigger ? <form className="form-group" onSubmit={this.register}></form> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
