import React, { Component } from 'react';
import {browserHistory } from 'react-router';
class Logout extends Component {
    constructor(props){
        super(props);
        console.log('logout compontn')
        this.logout();
    }
}

export default Logout;
