import React, { Component } from 'react';

import defaultImage from '../../public/img/default_product.jpg';

class Product extends Component {
	
	componentWillMount() {
		// this.setState({
		// 	timeID: this.props.time.id
		// });
	}

	render() {
		// .handleClick.bind(this, openModal)
	    return(
	    	<div className="col-xs-3 product-wrapper">
				<div>
					<img src={defaultImage} alt="default product" className="product-image"/>
				</div>
				<p className="product-name">{this.props.name}</p>
				<div className="add-wrapper">
					<input className="product-quantity" type="text" defaultValue="1"/>
					<button data-id={this.props.id} className="add-product">Add</button>
				</div>
			</div>
	  	);
	}
}

export default Product;
