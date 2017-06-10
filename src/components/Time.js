import React, { Component } from 'react';
import ajax from 'superagent';

class Time extends Component {
	constructor() {
		super();
		this.state = {
			isClicked: false,
			timeObjective: '',
			timeObjectiveTmp: '',
			timeID: null,
			update: false,
			openModal: false,
			modal: false
		};
	}

	componentWillMount() {
		this.setState({
			timeID: this.props.time.id
		});
	}

	handleClick(modal) {

		if ( modal ) {

			this.setState({
				modal: true,
				timeObjective: this.state.update ? this.state.timeObjective : this.props.value || this.state.timeObjective,
				timeObjectiveTmp: this.state.update ? this.state.timeObjectiveTmp : this.props.value || this.state.timeObjectiveTmp
			});
			var _timeTextarea = this.timeTextarea;
				setTimeout(function() {
					_timeTextarea.focus();
				}, 0);
		} else {
	   		let isClicked = !this.state.isClicked;
			this.setState({
				isClicked: isClicked
			});
			if ( isClicked ) {
				var _timeInput = this.timeInput;
				setTimeout(function() {
					_timeInput.focus();
				}, 0);
			}
		}
  	}

  	handleEnter(e) {
  		if ( e.key === 'Enter' ) {
  			let isClicked = !this.state.isClicked;
  			this.setState({
				timeObjective: e.target.value,
				timeObjectiveTmp: e.target.value,
				isClicked: isClicked,
				openModal: true
			});

			ajax.post('http://localhost:3001/add/schedule')
				.send({ id: this.state.timeID, text: e.target.value })
				.end((error, response) => {
					if(!error && response) {
						// console.log(response);
					} else {
						console.log('There was an error', error);
					}
				});
		}
  	}

  	closeModal() {
  		this.setState({
  			modal: false
  		});
  	}

  	saveScheduler() {
  		let value = this.state.timeObjectiveTmp;

  		ajax.put('http://localhost:3001/edit/schedule')
			.send({ id: this.state.timeID, text: value })
			.end((error, response) => {
				if(!error && response) {
					this.updateScheduler(response);
				} else {
					console.log('There was an error', error);
				}
			});
  		this.setState({
  			timeObjective: value,
  			update: true,
  			modal: false
  		});
  	}

  	updateScheduler(data) {
  		ajax.post('http://localhost:3001/update/schedule')
			.send({ times: JSON.parse(data.text).times })
			.end((error, response) => {
				if(!error && response) {
					// console.log(response);
				} else {
					console.log('There was an error', error);
				}
			});
  	}

  	changeTextArea(e) {
  		this.setState({
  			timeObjectiveTmp: e.target.value 
  		});
  	}

  	deleteTime() {
  		ajax.delete('http://localhost:3001/delete/schedule')
			.send({ id: this.state.timeID })
			.end((error, response) => {
				if(!error && response) {
					this.updateScheduler(response);
				} else {
					console.log('There was an error', error);
				}
			});

		this.setState({
  			timeObjective: '',
  			update: true,
  			modal: false
  		});
  	}

	render() {
		let modalClass = this.state.modal ? '' : 'hide';
		let timeClass = this.state.isClicked ? '' : 'hide';
		let timeObjective = this.state.timeObjective;
		let openModal = !!this.props.value || this.state.openModal;
		let timeValue = this.state.update ? this.state.timeObjective : this.props.value || this.state.timeObjective;

	    return(
	    	<div className="col-xs-12 time-wrapper">
				<div onClick={this.handleClick.bind(this, openModal)} className="time-container">
		  			<span className="timing">{this.props.time["startTime-UK"]}</span>
					<p className="time-text">{timeValue}</p>
				</div>
				<input 
					className={timeClass + ' textTime'} 
  					type="text"
  					ref={(input) => { this.timeInput = input; }}
  					onKeyPress={this.handleEnter.bind(this)} />
  				<div onClick={this.closeModal.bind(this)} className={modalClass + ' modal-background'}></div>
  				<div className={modalClass + ' modal'}>
  					<h2>Edit scheduler</h2>
  					<textarea className="edit-text" ref={(input) => { this.timeTextarea = input; }} value={this.state.timeObjectiveTmp} onChange={this.changeTextArea.bind(this)}/>
  					<br/>
  					<button className="edit-button" onClick={this.saveScheduler.bind(this)}>Edit</button>
  					<button className="delete-button" onClick={this.deleteTime.bind(this)}>Delete</button>
  				</div>
			</div>
	  	);
	}
}

export default Time;
