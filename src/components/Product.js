import React, { Component } from 'react';
import ajax from 'superagent';

import SERVER_URL from '../config';
import defaultImage from '../../public/img/default_product.jpg';
import '../css/product.css';

class Product extends Component {

	constructor(props) {
		super(props);

		this.state = {
			product: {},
            quantity: 0
		}
        this.addToBasket = this.addToBasket.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.getProduct(nextProps.routeParams.id);
    }

	componentWillMount() {
		if (!!this.state.product ) {
			this.getProduct(this.props.routeParams.id);
        }
	}

	getProduct(id) {
		ajax.get(SERVER_URL + '/product/' + id)
			.end((err, res) => {
				if(!err && res) {
					let product = JSON.parse(res.text);
					this.setState({
						product: product
					});
				} else {
					console.log('There was an error', err);
					this.setState({
						product: {}
					});
				}
			});
	}

    addToBasket() {
        let product = this.state.product;
        let currentUserId = window.localStorage.getItem('profile-id');
        currentUserId = JSON.parse(currentUserId);
        ajax.post(SERVER_URL + '/basket/')
            .send({
                user_id: currentUserId,
                product_id: product._id,
                color: product.color,
                quantity: this.state.quantity,
                price: product.price
            })
            .end((err, product) => {
                if(!err && product) {
                    console.log(product);
                }
                else {
                    console.log(err);
                }
            });
    }

    handleQuantityChange(event) {
        const product = this.state.product;
        this.setState({
            product: product,
            quantity: event.target.value
        });
    }

	render() {
		let product = this.state.product;
	 	let colors;

	  	if (product.color) {
			colors = product.color.map(color => {
	    		return (
					<span key={color}> {color} </span>
				)
			});
	  	}
	    return(

	    	<div className="row product-container">
	    		<div className="col-xs-12">
	    			<h2 className="pdp-product-title">{product.name}</h2>
	    		</div>
	    		<div className="col-xs-5 pdp-image-wrapper">
	    			<img src={defaultImage} alt="default image"/>
	    		</div>
	    		<div className="col-xs-7 pdp-info-wrapper">
	    			<p className="pdp-price-wrapper">Price: <span>{product.price}</span></p>
	    			<div className="pdp-colors-wrapper">
	    				<span>Colors: </span>
	    				<div>
	    					{colors}
    					</div>
	    			</div>
	    			<div className="pdp-add-wrapper">
                        <input className="pdp-product-quantity" type="text" defaultValue="1"
                               value={this.state.quantity} onChange={this.handleQuantityChange} />
						<button data-id={product._id} onClick={this.addToBasket} className="pdp-add-product">Add Product</button>
	    			</div>
	    		</div>
    			<div className="col-xs-12 pdp-description-wrapper">
    				<span>Product Description:</span>
    				<p>{product.description}</p>
    			</div>
			</div>
	  	);
	}
}

export default Product;
