import React, { Component } from 'react';
import ajax from 'superagent';

class Year extends Component {

	constructor() {
		super();
		this.state = {
			changed: false,
			goals: [],
			interval: null
		};
	}

	componentWillMount() {
  		this.updateYear();

  		ajax.get('http://localhost:3001/get/year/goals')
			.end((error, goals) => {
				if(!error && goals) {
					this.setState({
						goals: JSON.parse(goals.text)
					}); 
				} else {
					console.log('There was an error', error);
				}
			});
	}

	updateYear() {
		var self = this;
		this.setState({
			interval: setInterval(function() {
			
				if (self.state.changed) {
					ajax.post('http://localhost:3001/add/year/goals')
						.send({ goals : self.state.goals })
						.end((error, response) => {
							if(!error && response) {
								// console.log(response);
							} else {
								console.log('There was an error', error);
							}
						});
				}
			}, 3000)

		});

		setTimeout(function() {
			clearInterval(self.state.interval);
		}, 10000)
	}

	handleKey(e) {
		if (!!e.target.value) {
			let goals = this.state.goals;
			goals[e.target.id] = e.target.value;

			this.setState({
				changed: true,
				goals: goals
			});
		} else {
			this.setState({
				changed: false
			});
		}
	}

	changeYearInput(e) {
		if (!!e.target.value) {
			let goals = this.state.goals;
			goals[e.target.id] = e.target.value;

			this.setState({
				changed: true,
				goals: goals
			});
		} else {
			this.setState({
				changed: false
			});
		}
	}

  render() {

    return (
        <div className="year-wrapper">
	        <div className="row">
				<div className="col-xs-12 col-sm-2">
					<div className="hideShowLabel">Goals:</div> 
				</div>
				<div className="col-xs-12 col-sm-10"> 
					<h1 className="day-title">Set you year Goals! Be Bold!</h1>
					<div>
						1: <input id="0" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[0] || ''} type="text" />
					</div>
					<div>
						2: <input id="1" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[1] || ''} type="text" />
					</div>
					<div>
						3: <input id="2" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[2] || ''} type="text" />
					</div>
					<div>
						4: <input id="3" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[3] || ''} type="text" />
					</div>
					<div>
						5: <input id="4" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[4] || ''} type="text" />
					</div>
					<div>
						6: <input id="5" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[5] || ''} type="text" />
					</div>
					<div>
						7: <input id="6" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[6] || ''} type="text" />
					</div>
					<div>
						8: <input id="7" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[7] || ''} type="text" />
					</div>
					<div>
						9: <input id="8" onChange={this.changeYearInput.bind(this)} onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[8] || ''} type="text" />
					</div>
					<div>
						10: <input id="9" onChange={this.changeYearInput.bind(this)}  onKeyPress={this.handleKey.bind(this)} className="thoughts-text" value={this.state.goals[9] || ''} type="text" />
					</div>
				</div>
			</div>
      	</div>
    );
  }
}

export default Year;
