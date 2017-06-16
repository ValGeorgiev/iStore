import React, { Component } from 'react';
import ajax from 'superagent';
import auth from './Auth';
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            rePassword:'',
        }

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
	register(event){
        let error= false ; 
        if(!this.comparePasswords()){
            alert('Passwords are not identical');
            error = true ;
        }
        if(!this.validatePassword()){
            alert('Your password must be at least 6 symbols')
            error = true ;
        }
        
        if(!error){
            let postParams = {firstName:this.state.firstName,
                                lastName:this.state.lastName,
                                email:this.state.email,
                                password: this.state.password};

            ajax.post('http://localhost:3001/user/register',postParams)
                .end((error, response) => {
                    if(!!error) {
                        alert(error);
                    }
                    else{
                        alert(response.text);
                    }
                });
        }                    
        event.preventDefault();
    }
    validatePassword(){
        return  (/^([a-zA-Z0-9!@#$%^&*]{6,16})$/.test(this.state.password) &&
            /^([a-zA-Z0-9!@#$%^&*]{6,16})$/.test(this.state.rePassword))
    }
    comparePasswords(){
        return this.state.password == this.state.rePassword ;
    }

	render() {
		return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Register:</h2>
                    <form  className="form-group" onSubmit={this.register}>
                        <div className="form-group">
                            <label htmlFor="first-name">First name: </label>
                            <input type="text" 
                                id="first-name" 
                                className="form-control"
                                name="firstName" 
                                value={this.state.firstName} 
                                onChange={this.handleChange}
                                required/>
                        </div>
                        <div className="form-group">
                            
                            <label htmlFor="last-name">Last name: </label>
                            <input type="text" 
                                id="last-name" 
                                className="form-control" 
                                name="lastName"
                                value={this.state.lastName} 
                                onChange={this.handleChange}
                                required/>
                                
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" 
                                id="email" 
                                className="form-control" 
                                name="email"
                                value={this.state.email} 
                                onChange={this.handleChange}
                                required/>
                                
                        </div>
                        <div className="form-group">            
                            <label htmlFor="password">Password: </label>
                            <input type="password" 
                                id="password" 
                                className="form-control" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleChange}
                                required/>
                                
                        </div>
                        <div className="form-group">            
                            <label htmlFor="re-password">Re-type password: </label>
                            <input type="password" 
                                id="re-password" 
                                className="form-control" 
                                name="rePassword"
                                value={this.state.rePassword} 
                                onChange={this.handleChange}
                                required/>
                                
                        </div>
                        <input type="submit" value="Submit" className="btn btn-default" />
                    </form>
                </div>
            </div>
        </div>
		);
	}
}

export default Register;
