import React, { Component } from 'react';
import Product from './Product';

class Basket extends Component {

    constructor() {
        super();
        this.state = {
            added_products: []
        };
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(product){
        const updated_products = this.state.added_products.slice();
        updated_products.push(product);
        this.setState({ added_products: updated_products });
    }

    render() {
        const product_entities = this.state.added_products.map(product =>
            < Product key={product._id} addToBasket={this.addProduct} />);
        return (
            <div className="row products-wrapper">
                {product_entities}
            </div>
        );
    }


}

export default Basket;
