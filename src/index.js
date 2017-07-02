import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App';

import {
  Product,
  ProductGrid,
  Profile,
  Auth,
  Error,
  Login,
  Register,
  ProductForm,
  BasketGrid
} from './components';


function checkAuth(nextState, replace, callback) {
  Auth.checkForToken((el) => {
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
  Auth.checkForToken((el) => {
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
      <Route path="/products/:product" component={ProductGrid} />
      <Route path="/product/:id" component={Product} />
      <Route path="/profile" component={Profile} onEnter={ProfileGuard} />
      <Route path="/register" component={Register} onEnter={checkAuth} />
      <Route path="/login" component={Login} onEnter={checkAuth} />
      <Route path="/logout" onEnter={Auth.logout} />
      <Route path="/admin/product" component={ProductForm} onEnter={ProfileGuard} />
      <Route path="/basket" component={BasketGrid} />
      <Route path="/error" component={Error} />
    </Route>
  </Router>

), document.getElementById('root'));
