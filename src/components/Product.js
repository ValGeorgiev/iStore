import React, { Component } from 'react';
import ajax from 'superagent';

import SERVER_URL from '../config';
import defaultImage from '../../public/img/default_product.jpg';
import '../css/product.css';

import AddProduct from './AddProduct';

class Product extends Component {

	constructor(props) {
		super(props);

		this.state = {
			product: {},
            comments: [],
            quantity: 1,
            comment: ''
        }

		this.handleCommentSubmit =  this.handleCommentSubmit.bind(this);
		this.handleCommentChange =  this.handleCommentChange.bind(this);
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

	handleCommentChange(event) {
		this.setState({
			comment: event.target.value
		});
	}

	handleDeleteComment(id) {
		ajax.del(`${SERVER_URL}/product/comment/${this.state.product._id}/${id}`)
			.end((err, res) => {
				let comments = JSON.parse(res.text);
				this.setState({
					comments: comments
				});
			});
	}

	handleCommentSubmit() {
		ajax.post(SERVER_URL + '/product/add/comment')
			.send({
				content: this.state.comment,
				product_id: this.state.product._id,
				user_id: window.localStorage.getItem('profile-id')
			})
			.end((err, res) => {
				let comment = JSON.parse(res.text);
				let comments = this.state.comments;
				comments.push({
					user: comment.user,
					content: comment.content,
					_id: comment._id
				});

				this.setState({
					comments: comments,
					comment: ''
				});
			});
	}

    handleQuantityChange(event) {
        this.setState({
            quantity: event.target.value
        });
    }

	getProduct(id) {
		ajax.get(SERVER_URL + '/product/' + id)
			.end((err, res) => {
				if(!err && !!res) {
					let product = JSON.parse(res.text);
					this.setState({
						product: product
					});
					this.getProductComments(product._id);
				} else {
					this.setState({
						product: {}
					});
				}
			});
	}

	getProductComments(id) {
		ajax.get(SERVER_URL + '/product/comments/' + id)
			.end((err, res) => {
				if (!err && !!res) {
					let comments = JSON.parse(res.text);

					this.setState({
						comments: comments
					});
				} else {
					this.setState({
						comments: []
					});
				}
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

	  	let comments = this.state.comments.map(comment => {
	  		return (
	  			<div key={comment._id} className="comment-wrapper">
	  				<span>{comment.user.first_name} {comment.user.last_name}:</span>
	  				<p>{comment.content}</p>
	  				<button onClick={this.handleDeleteComment.bind(this, comment._id)}>X</button>
	  			</div>
  			)
	  	}).reverse();


	    return(

	    	<div className="row product-container">
	    		<div className="col-xs-12">
	    			<h2 className="pdp-product-title">{product.name}</h2>
	    		</div>
	    		<div className="col-xs-5 pdp-image-wrapper">
	    			<img src={defaultImage} alt="default"/>
	    		</div>
	    		<div className="col-xs-7 pdp-info-wrapper">
	    			<p className="pdp-price-wrapper">Price: <span>{product.price}</span></p>
	    			<div className="pdp-colors-wrapper">
	    				<span>Colors: </span>
	    				<div>
	    					{colors}
    					</div>
	    			</div>
	    			<AddProduct product={product} handleQuantityChange={this.handleQuantityChange} quantity={this.state.quantity}/>
	    		</div>
    			<div className="col-xs-12 pdp-description-wrapper">
    				<span>Product Description:</span>
    				<p>{product.description}</p>
    			</div>
    			<div className="col-xs-12 add-pdp-comment">
    				<span>Comment: </span>
    				<textarea value={this.state.comment} onChange={this.handleCommentChange}></textarea>
    				<div>
    					<button className="add-comment" onClick={this.handleCommentSubmit}>Add Comment</button>
    				</div>
    			</div>
    			<div className="col-xs-12 pdp-comments">
    				{comments}
    			</div>

			</div>
	  	);
	}
}

export default Product;
