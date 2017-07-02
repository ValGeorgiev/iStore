import React, { Component } from 'react';
import ajax from 'superagent';

import SERVER_URL from '../config';
import '../css/productform.css';

class ProductForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			colors: [],
			quantity: 1,
			price: '',
			categories: []
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleColorsChange = this.handleColorsChange.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
	}

	handleSubmit() {
		this.addProduct();
	}

	handleNameChange(event) {
		this.setState({
			name: event.target.value
		});
	}
	handleDescriptionChange(event) {
		this.setState({
			description: event.target.value
		});
	}
	handleColorsChange(event) {
		let colors = event.target.value;

		colors = colors.split(',').map(color => {
			return color.trim()
		})

		this.setState({
			colors: colors
		});
	}
	handleQuantityChange(event) {
		this.setState({
			quantity: event.target.value
		});
	}
	handlePriceChange(event) {
		this.setState({
			price: event.target.value
		});
	}
	handleCategoriesChange(event) {
		let categories = event.target.value;

		categories = categories.split(',').map(category => {
			return category.trim()
		})

		this.setState({
			categories: categories
		});
	}
	
	addProduct() {
		let {name, description, colors, quantity, price, categories} = this.state;
		console.log(categories);
		ajax.post(SERVER_URL + '/product/add')
			.send({
				name: name,
				description: description,
				color: colors,
				quantity: quantity,
				price: price,
				category: categories
			})
			.end((err, product) => {
				if (!err && product) {
					console.log(product);
				} else {
					console.error(err);
				}
			});
			
	}

  	render() {
	    return (
			<div className="row product-form-wrapper">
				<div className="col-xs-12">
					<h1>Add new product</h1>
			  		<form onSubmit={this.handleSubmit}>
			  			<label>
							Name:
							<input type="text" className="addproduct-name" value={this.state.name} onChange={this.handleNameChange} />
						</label>
						<label>
							Description:
							<input type="text" className="addproduct-description" value={this.state.description} onChange={this.handleDescriptionChange} />
						</label>
						<label>
							Colors:
							<input type="text" className="addproduct-colors" value={this.state.colors} onChange={this.handleColorsChange} />
						</label>
						<label>
							Quantity:
							<input type="text" className="addproduct-quantity" value={this.state.quantity} onChange={this.handleQuantityChange} />
						</label>
						<label>
							Price:
							<input type="text" className="addproduct-price" value={this.state.price} onChange={this.handlePriceChange} />
						</label>
						<label>
							Categories:
							<input type="text" className="addproduct-categories" value={this.state.categories} onChange={this.handleCategoriesChange} />
						</label>
						<input className="submit-btn" type="submit" value="Submit" />
			  		</form>
				</div>
			</div>
	    );
  	}
}

export default ProductForm;
