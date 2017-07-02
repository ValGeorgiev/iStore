import React, { Component } from 'react';

class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddressInfo: [],

        };
    }
    showAddressInfo(index, trigger) {
        var tmpArray = this.state.showAddressInfo.slice();
        tmpArray[index] = trigger;
        this.setState({ showAddressInfo: tmpArray });
    }

    render() {
        return (
            <div>
                <div>{this.props.address}
                    {!this.state.showAddressInfo[this.props.index] ?
                        <button onClick={this.showAddressInfo.bind(this, this.props.index, true)} >Expand</button> :
                        <button onClick={this.showAddressInfo.bind(this, this.props.index, false)} >Hide</button>}
                </div>

                {this.state.showAddressInfo[this.props.index] ?
                    <div>
                        <p>City: {this.props.city}</p>
                        <p>Country: {this.props.country}</p>
                        <p>Postal Code: {this.props.postal}</p>

                    </div> : null
                }
            </div>
        );
    }
}

export default Address;
