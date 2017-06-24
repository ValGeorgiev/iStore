import React, { Component } from 'react';
import { Link } from 'react-router'
import auth  from './Auth';
import '../css/app.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			isAuthenticated: false
		};
	}
	
	componentDidMount() {
		auth.checkForToken((flag) => this.setState({
			'isAuthenticated' : flag
		}) ); 
	} 

	render() {
		
		return (
			<div className="wrapper">
				<div className="row nav">
			        <div className="col-xs-12">
			          <h1 id="main-title">iStore</h1>
			        </div>
			        <div className="col-xs-3">
			          <Link to="/products/phones">Phones</Link>
			        </div>    
			        <div className="col-xs-3">
			          <Link to="/products/tv">TV</Link>
			        </div>    
			        <div className="col-xs-3">
			          <Link to="/products/laptops">Laptops</Link>
			        </div>
			        <div className="col-xs-3">
			          {this.state.isAuthenticated ? <Link to="/register">Register</Link> : null } 
			        </div>    
			        <div className="col-xs-3">
			          {this.state.isAuthenticated ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link> } 
			        </div>    
		        </div>
				{this.props.children}		
  			</div>
		);
 	}
}


export default App;
