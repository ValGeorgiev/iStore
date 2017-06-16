import React, { Component } from 'react';
import auth from './Auth';
import ajax from 'superagent';
import { browserHistory } from 'react-router';

class Login extends Component {
    constructor(){
        super();
        this.state={

        };
        this.Authenticate = this.Authenticate.bind(this);
    }

	Authenticate(event){
        console.log(event.target.email.value);
        event.preventDefault();
        let postParams = {email:event.target.email.value,password: event.target.password.value};

        ajax.post('http://localhost:3001/user/authenticate',postParams)
			.end((error, response) => {
				if(!!error) {
                    alert(error);
                }
                else if(!!response.body.err){
                    alert(response.body.err);
                    window.localStorage.setItem('counter',response.body.counter);
                    console.log('counter')
                    console.log(response.body.counter)
                    
                }
				else if(response.body.success == true){
                    console.log('hello')
                    this.login(response.body.token); 
				}
			});
    }
    login(token){
        window.localStorage.setItem('jwt-token',JSON.stringify(token));
        //clear localStorage counter
        window.localStorage.removeItem('counter');
        window.location.replace('/profile');
    }
    logout(){
        window.localStorage.removeItem('jwt-token');
    }

	render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Login:</h2>
                        <form  className="form-group" onSubmit={this.Authenticate}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" className="form-control" name="email"/>
                            </div>
                            <div className="form-group">            
                                <label htmlFor="password">Password: </label>
                                <input type="password" id="password" className="form-control" name="password" />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-default" />
                        </form>
                    </div>
                </div>
            </div>
        );		
	}
}

export default Login;
