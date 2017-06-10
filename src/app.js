import React, { Component } from 'react';
import Scheduler from './components/Scheduler';
import Day from './components/Day';
import Week from './components/Week';
import Year from './components/Year';
import Error from './components/Error';
import settingsImage from '../public/img/settings.png';

import './css/app.css';

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

	handleRouter() {
		switch (this.props.page) {
			case 'Scheduler': return <Scheduler times={this.state.times}/>;
			case 'Day': return <Day />;
			case 'Week': return <Week />;
			case 'Year': return <Year />;
			case 'Error': return <Error />;
		}
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
			          <div onClick={this.closeSettingsModal.bind(this)} className={settingsClass + ' modal-background'}> </div>
			          <div className={settingsClass + ' settings-modal'}>
		          		<h2>Settings</h2>
		          		<div className="start-time">
		          			<span className="start-label">Scheduler start time: </span>
		          			
		          		</div>
		          		<div className="end-time">
		          			<span className="end-label">Scheduler end time: </span>
		          			
		          		</div>
		          		<button className="save-btn" onClick={this.saveSettings.bind(this)}>Save</button>
			          </div>
			        </div>    
			        <div className="col-xs-3">
			          <a className="nav-tab" href="/">Scheduler</a>
			        </div>    
			        <div className="col-xs-3">
			          <a className="nav-tab middle" href="/day">Day</a>
			        </div>    
			        <div className="col-xs-3">
			          <a className="nav-tab right" href="/week">Week</a>
			        </div>    
			        <div className="col-xs-3">
			          <a className="nav-tab" href="/year">Year</a>
			        </div>    
		        </div>
				{this.handleRouter()}		
  			</div>
		);
 	}
}


export default App;
