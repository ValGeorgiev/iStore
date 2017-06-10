import React, { Component } from 'react';
import DayContent from './DayContent';

import '../css/day.css';


class Day extends Component {

	constructor() {
		super();
		this.state = {
			dayContent: null
		};
	}

	componentWillMount() {
		this.setState({
			dayContent: (new Date().getTime()).toString()
		});
	}

	getFormatDate(date) {
		return (date.getDate() + '/' + (date.getMonth() + 1)  + '/' + date.getFullYear());
	}

	getDateValues() {
		let today = new Date();
		let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
		let afterTomorrow = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
		let afterTomorrowNext = new Date(afterTomorrow.getTime() + 24 * 60 * 60 * 1000);
		let afterTomorrowNext1 = new Date(afterTomorrowNext.getTime() + 24 * 60 * 60 * 1000);
		let afterTomorrowNext2 = new Date(afterTomorrowNext1.getTime() + 24 * 60 * 60 * 1000);

		return {
			today: this.getFormatDate(today),
			tomorrow: this.getFormatDate(tomorrow),
			afterTomorrow: this.getFormatDate(afterTomorrow),
			afterTomorrowNext: this.getFormatDate(afterTomorrowNext),
			afterTomorrowNext1: this.getFormatDate(afterTomorrowNext1),
			afterTomorrowNext2: this.getFormatDate(afterTomorrowNext2)

		};
	}

	changeDay() {
		let self = this;

		window.addEventListener("hashchange", function() {
			console.log('test');
			switch (window.location.hash.slice(1)) {
				case "today": self.setState({ dayContent: (new Date().getTime()).toString()}); break;
				case "tomorrow": self.setState({ dayContent: (new Date().getTime() + 24 * 60 * 60 * 1000).toString()}); break; 
				case "1": self.setState({ dayContent: (new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toString()}); break; 
				case "2": self.setState({ dayContent: (new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toString()}); break; 
				case "3": self.setState({ dayContent: (new Date().getTime() + 4 * 24 * 60 * 60 * 1000).toString()}); break; 
				case "4": self.setState({ dayContent: (new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toString()}); break; 
				default : self.setState({ dayContent: (new Date()).toString()}); break;
			}
		});
	}

	render() {
		this.changeDay();
		return (
			<div className="day-wrapper">
				<div className="row"> 
					<div className="col-xs-2">
						<a className="day-link" href="/day#today">
							Today: {this.getDateValues().today}
						</a>
					</div>
					<div className="col-xs-2">
						<a className="day-link" href="/day#tomorrow">
							Tomorrow: {this.getDateValues().tomorrow}
						</a>
					</div>
					<div className="col-xs-2">
						<a className="day-link" href="/day#1">
							{this.getDateValues().afterTomorrow}
						</a>
					</div>
					<div className="col-xs-2">
						<a className="day-link" href="/day#2">
							{this.getDateValues().afterTomorrowNext}
						</a>
					</div>
					<div className="col-xs-2">
						<a className="day-link" href="/day#3">
							{this.getDateValues().afterTomorrowNext1}
						</a>
					</div>
					<div className="col-xs-2">
						<a className="day-link" href="/day#4">
							{this.getDateValues().afterTomorrowNext2}
						</a>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<DayContent day={this.state.dayContent} />
					</div>
				</div>
	  	    </div>
		);
	}
}

export default Day;
