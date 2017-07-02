import React, { Component } from 'react';
import { Link } from 'react-router'
import auth from './Auth';
import '../css/app.css';
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			user: {},
			isAdmin: false
		};
		// this.getProfileData= this.getProfileData.bind(this);
	}

	componentWillMount() {
		auth.getUserData((data) => {
			this.setState({
				'isAuthenticated': data.isAuthenticated,
				'user': data.user,
				'isAdmin': data.isAdmin
			})
		});
	}

	renderAdminLink() {

		if (this.state.isAdmin) {

			return (
				<div className="col-xs-3">
					<Link to="/admin/product">Add Product</Link>
				</div>
			);
		}
		return '';
	}



	render() {
		let adminLink = this.renderAdminLink();
		let  dat= this;
		var children = React.Children.map(this.props.children, function (child) {
			return React.cloneElement(child, {
				userData: dat.state.user 
			});
		});
		return (
			<div className="wrapper container-fluid">
				<div className="row nav">
					<div className="col-xs-9">
						<h1 id="main-title">iStore</h1>
					</div>
					<div className="col-xs-1">
						{this.state.isAuthenticated ? <Link to="/basket">Basket</Link> : ''}
					</div>
					<div className="col-xs-1">
						{!this.state.isAuthenticated ? <Link to="/register">Register</Link> : <Link to="/profile">Profile</Link>}
					</div>
					<div className="col-xs-1">
						{!this.state.isAuthenticated ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link>}
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

					{adminLink}
				</div>
				{children}
			</div>
		);
	}
}

export default App;
