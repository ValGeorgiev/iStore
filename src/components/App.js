import React, { Component } from 'react';
import { Link } from 'react-router'

import settingsImage from '../../public/img/settings.png';

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

	clickSettings() {
		this.setState({
  			openSettings: true
  		});
	}


	closeSettingsModal() {
		this.setState({
  			openSettings: false
  		});
	}

	saveSettings() {
		this.setState({
  			openSettings: false
  		});
	}
 
	render() {
		let settingsClass = this.state.openSettings ? '' : 'hide';
		
		return (
			<div className="wrapper">
				<div className="row nav">
			        <div className="col-xs-12">
			          <h1 id="main-title">All In</h1>
			          <img onClick={this.clickSettings.bind(this)} src={settingsImage} className="settings-icon"/>
		            </div>
			        <div className="col-xs-3">
			          <Link to="/scheduler">Scheduler</Link>
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
