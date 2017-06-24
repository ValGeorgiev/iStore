import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App';

import ProductGrid from './components/ProductGrid';
import Day from './components/Day';
import Week from './components/Week';
import Year from './components/Year';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Scheduler from './components/Scheduler';
import Error from './components/Error';
import auth from './components/Auth';


var isAuthenticated = true; 


function checkAuth(nextState, replace, callback) {
  auth.checkForToken((el)=>{
    if (el) {
      replace({
        pathname: 'profile',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback();
  });
}

function logout(){
    window.localStorage.removeItem('jwt-token');
    window.location.replace('/');
}
        
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
	    <Route path="/products/:product" component={ProductGrid}/>
      	<Route path="/profile" component={Profile} />
	    <Route path="/scheduler" component={Scheduler}/>
	    <Route path="/day" component={Day}/>
	    <Route path="/week" component={Week}/>
	    <Route path="/register" component={Register} onEnter={checkAuth} />
      	<Route path="/login" component={Login} onEnter={checkAuth} />
	    <Route path="/logout" onEnter={logout}/>
      <Route path="/error" component={Error}/>
    </Route>
  </Router>

), document.getElementById('root'));
