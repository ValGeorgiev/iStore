import React, { Component } from 'react';
import ajax from 'superagent';

import Product from './Product';
import SERVER_URL from '../config';

class BasketGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            added_products: [];
        };
    }



}
