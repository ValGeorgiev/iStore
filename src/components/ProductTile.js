import React, { Component } from 'react';

import defaultImage from '../../public/img/default_product.jpg';

class ProductTile extends Component {

	constructor(props) {
		super(props);
	}
	
	componentWillMount() {

	}

	render() {
	    return(
	    	<div className="col-xs-3 product-wrapper">
				<div className="image-wrapper">
					<img src={defaultImage} alt="default product" className="product-image"/>
				</div>
				<p className="product-name">{this.props.name}</p>
				<p className="product-price">Price: {this.props.price}</p>
				<div className="add-wrapper">
					<input className="product-quantity" type="text" defaultValue="1"/>
					<button data-id={this.props.id} className="add-product">Add</button>
				</div>
			</div>
	  	);
	}
}

export default ProductTile;
