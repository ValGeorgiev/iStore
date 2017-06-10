import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import App from './app';

function router() {
	var page = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

	switch (page) {
		case ''		: page = "Scheduler"; break;
		case 'day'	: page = "Day"; break;
		case 'week' : page = "Week"; break;
		case 'year' : page = "Year"; break;
		default 	: page = "Error";
	}

	return page;
}

ReactDOM.render(
  <App page={router()}/>,
  document.getElementById('root')
);
