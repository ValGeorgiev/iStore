import React, { Component } from 'react';
import { Link } from 'react-router'

import defaultImage from '../../public/img/default_product.jpg';

class ProductTile extends Component {

	constructor(props) {
		super(props);

		this.state = {}
	}
	
	componentWillMount() {

	}

	render() {
	    return(
	    	<div className="col-xs-3">
	    		<div className="product-wrapper">
		    		<Link to={`/product/${this.props.id}`}>
						<div className="image-wrapper">
							<img src={defaultImage} alt="default product" className="product-image"/>
						</div>
						<p className="product-name">{this.props.name}</p>
						<p className="product-price">Price: {this.props.price}</p>
					</Link>
				</div>
			</div>
	  	);
	}
}

export default ProductTile;
