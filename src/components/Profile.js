import React, { Component } from 'react';

class Profile extends Component {
    constructor(){
        super();
    }


	render() {

        return (
            <div className="container">
                <div className="row">
                    <h1 className>Profile page</h1>
                    <div className="col-md-12 register">
                    <p>Dummy profile for only Authwenticated</p>
                    </div>
                </div>
            </div>
        );		
	}
}

export default Profile;
