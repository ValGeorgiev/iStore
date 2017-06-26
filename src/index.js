import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App';

import ProductGrid from './components/ProductGrid';
import Basket from './components/Basket';
import Product from './components/Product';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Error from './components/Error';
import auth from './components/Auth';


function checkAuth(nextState, replace, callback) {
  auth.checkForToken((el)=>{
    if (el) {
      replace({
        pathname: '',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback();
  });
}


function ProfileGuard(nextState, replace, callback) {
  auth.checkForToken((el)=>{
    if (el === false) {
      replace({
        pathname: '',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback();
  });
}


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
	    <Route path="/products/:product" component={ProductGrid}/>
        <Route path="/basket" component={Basket}/>
      	<Route path="/product/:id" component={Product} />
      	<Route path="/profile" component={Profile}  onEnter={ProfileGuard}/>
	    <Route path="/register" component={Register} onEnter={checkAuth} />
      	<Route path="/login" component={Login} onEnter={checkAuth} />
	    <Route path="/logout" onEnter={auth.logout}/>
      <Route path="/error" component={Error}/>
    </Route>
  </Router>

), document.getElementById('root'));
