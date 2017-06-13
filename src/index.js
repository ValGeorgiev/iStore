import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App';

import ProductGrid from './components/ProductGrid';
import Day from './components/Day';
import Week from './components/Week';
import Year from './components/Year';
import Error from './components/Error';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
	    <Route path="/products" component={ProductGrid}/>
	    <Route path="/day" component={Day}/>
	    <Route path="/week" component={Week}/>
	    <Route path="/year" component={Year}/>
    </Route>
    <Route path="/error" component={Error}/>
  </Router>
), document.getElementById('root'));