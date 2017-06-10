import React, { Component } from 'react';
import ajax from 'superagent';
import Time from './Time';


class Scheduler extends Component {

	constructor() {
		super();
		this.state = {
			db_times: []
		};
	}

	componentWillMount() {
		ajax.get('http://localhost:3001/get/scheduler')
			.end((error, response) => {
				if(!error && response) {
					var times = response.body[0] ? response.body[0].times : []; 
					this.setState({
						db_times: times
					});
				} else {
					console.log('There was an error', error);
				}
			});
	}

	checkForDBTime(time) {

		for (var i = 0; i < this.state.db_times.length; i++) {
			if (this.state.db_times[i].id === time.id) {
				
				return this.state.db_times[i];
			}
		}

	}

  	render() {
	  	let times,
	  		_time,
	  		value = '';

	  	if ( this.props.times ) {
	  		times = this.props.times.map(time => {
	            if (time.id > 5 && time.id < 16) {
	            	_time = this.checkForDBTime(time);

	            	if (!!_time) {
	            		value = _time.text;
	            	} else {
	            		value = "";
	            	}
		  			return (
		  				<Time key={time.id} time={time} value={value}/>
		  			)
	  			}
	  		})
	  	}

	    return (
	      <div className="scheduler-wrapper">
		 	  <h2 className="scheduler-title">Your Scheduler</h2>
	          {times}
	      </div>
	    );
  	}
}

export default Scheduler;
