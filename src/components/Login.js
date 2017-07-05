import React, { Component } from 'react';
import auth from './Auth';
import ajax from 'superagent';
import SERVER_URL from '../config';

class Login extends Component {
    constructor(){
        super();
        this.state = {

        };
        this.authenticate = this.authenticate.bind(this);
    }

	authenticate(event){
        event.preventDefault();
        let postParams = {email:event.target.email.value,password: event.target.password.value};

        ajax.post(SERVER_URL + '/user/authenticate',postParams)
			.end((error, response) => {
				if(!!error) {
                    alert(error);
                }
                else if(!!response.body.err){
                    alert(response.body.err);
                    window.localStorage.setItem('counter',response.body.counter);
                }
				else if(response.body.success === true){
                    this.login(response.body.token,response.body.userType,response.body.id);
				}
			});
    }
    login(token,userType,id){
        auth.checkUserType(userType);
        window.localStorage.setItem('jwt-token',token);
        window.localStorage.setItem('profile-id',id);
        //clear localStorage counter
        window.localStorage.removeItem('counter');
        window.location.replace('/profile');
    }


	render() {

        return (
            <div className="row">
                <div className="col-xs-12 register">
                    <h2>Login:</h2>
                    <form  className="form-group" onSubmit={this.authenticate}>
                        <div className="form-group email-group-login">
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" className="form-control" name="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" className="form-control" name="password" />
                        </div>
                        <input type="submit" value="Login" className="btn btn-default" />
                    </form>
                </div>
            </div>
        );
	}
}

export default Login;
