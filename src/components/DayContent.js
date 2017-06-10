import React, { Component } from 'react';

class DayContent extends Component {

	propTypes: {
		day: React.PropTypes.string
	}
	
	render() {
		//let date = new Date(this.props.day * 1000).getDate();
		return (
			<div className="row">
				<div className="col-xs-12 col-sm-2">
					<div className="hideShowLabel">Thoughts:</div> 
				</div>
				<div className="col-xs-12 col-sm-10"> 
					<h1 className="day-title">Share your thoughts!</h1>
					<div>
						1: <input className="thoughts-text" type="text" />
					</div>
					<div>
						2: <input className="thoughts-text" type="text" />
					</div>
					<div>
						3: <input className="thoughts-text" type="text" />
					</div>
					<div>
						4: <input className="thoughts-text" type="text" />
					</div>
					<div>
						5: <input className="thoughts-text" type="text" />
					</div>
					<div>
						6: <input className="thoughts-text" type="text" />
					</div>
					<div>
						7: <input className="thoughts-text" type="text" />
					</div>
				</div>
				<div className="col-xs-12 col-sm-2">
					<div className="hideShowLabel">Achievements:</div> 
				</div>
				<div className="col-xs-12 col-sm-10"> 
					<h1 className="day-title">Achievements for today!</h1>
					<div>
						1: <input className="achieve-text" type="text" />
					</div>
					<div>
						2: <input className="achieve-text" type="text" />
					</div>
					<div>
						3: <input className="achieve-text" type="text" />
					</div>
					<div>
						4: <input className="achieve-text" type="text" />
					</div>
					<div>
						5: <input className="achieve-text" type="text" />
					</div>
					<div>
						6: <input className="achieve-text" type="text" />
					</div>
					<div>
						7: <input className="achieve-text" type="text" />
					</div>
				</div>
				<div className="col-xs-12 col-sm-2">
					<div className="hideShowLabel">Thanks:</div> 
				</div>
				<div className="col-xs-12 col-sm-10"> 
					<h1 className="day-title">Thanks to yourself!</h1>
					<div>
						1: <input className="thank-text" type="text" />
					</div>
					<div>
						2: <input className="thank-text" type="text" />
					</div>
					<div>
						3: <input className="thank-text" type="text" />
					</div>
					<div>
						4: <input className="thank-text" type="text" />
					</div>
					<div>
						5: <input className="thank-text" type="text" />
					</div>
					<div>
						6: <input className="thank-text" type="text" />
					</div>
					<div>
						7: <input className="thank-text" type="text" />
					</div>
				</div>
			</div>
		);
	}
}

export default DayContent;
