import React, { Component } from 'react';
import ajax from 'superagent';

import ProductTile from './ProductTile';
import SERVER_URL from '../config';
import '../css/productgrid.css';


class ProductGrid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.getProducts(nextProps.routeParams.product);
	}

	componentWillMount() {
		if (!!this.state.products && this.state.products.length === 0) {
			this.getProducts(this.props.routeParams.product);
		}
	}

	getProducts(type) {
		ajax.get(SERVER_URL + '/product/all/' + type)
			.end((err, res) => {
				if(!err && res) {
					let products = JSON.parse(res.text);

					this.setState({
						products: products
					});
				} else {
					this.setState({
						products: []
					});
				}
			});
	}

  	render() {
	  	let products;

	  	if (this.state.products && this.state.products.length > 0) {
			products = this.state.products.map(product => {
	    		return (
					<ProductTile key={product._id} name={product.name} price={product.price} id={product._id}/>
				)
			});
	  	} else {
	  		products = <div className="no-products">Sorry, this category is empty!</div>
	  	}

	    return (
			<div className="row products-wrapper">
				<div className="col-xs-12">
			  		<h2 className="products-title">{this.props.routeParams.product.toUpperCase()}</h2>
				</div>
				{products}
			</div>
	    );
  	}
}

export default ProductGrid;
