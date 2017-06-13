import React, { Component } from 'react';
import ajax from 'superagent';

import Product from './Product';
import SERVER_URL from '../config';


class ProductGrid extends Component {
	constructor() {
		super();

		this.state = {
			products: []
		}
	}
	

	componentWillMount() {
		this.getProducts();
	}

	getProducts() {
		ajax.get(SERVER_URL + '/product/all')
			.end((err, res) => {
				if(!err && res) {
					let products = JSON.parse(res.text);

					this.setState({
						products: products
					});
				} else {
					console.log('There was an error', err);
					this.setState({
						products: []
					});
				}
			});
	}

	addProduct() {
		ajax.post(SERVER_URL + '/product/add')
			.send({
				name: "iPhone 7",
				description: "The newest iPhone",
				color: "black",
				quantity: 200,
				price: "1005$"
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
	  	let products;
	  	
	  	if (this.state.products) {
			products = this.state.products.map(product => {
	    		return (
					<Product key={product._id} name={product.name} id={product._id}/>
				)
			});
	  	}
  	
	    return (
			<div className="row products-wrapper">
				<div className="col-xs-12">
			  		<h2 className="product-title">Products</h2>
				</div>
				{products}
			</div>
	    );
  	}
}

export default ProductGrid;
