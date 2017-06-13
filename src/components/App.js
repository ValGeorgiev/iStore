import React, { Component } from 'react';
import { Link } from 'react-router'

import '../css/app.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			times: [],
			openSettings: false
		};
	}

	componentWillMount() {

	}

	render() {
		
		return (
			<div className="wrapper">
				<div className="row nav">
			        <div className="col-xs-12">
			          <h1 id="main-title">iStore</h1>
			        </div>
			        <div className="col-xs-3">
			          <Link to="/products">Phones</Link>
			        </div>    
			        <div className="col-xs-3">
			          <Link to="/day">Day</Link>
			        </div>    
			        <div className="col-xs-3">
			          <Link to="/week">Week</Link>
			        </div>    
			        <div className="col-xs-3">
			          <Link to="/year">Year</Link>
			        </div>    
		        </div>
				{this.props.children}		
  			</div>
		);
 	}
}


export default App;
