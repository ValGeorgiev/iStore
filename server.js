// server.js

var express = require('express'),
	path = require('path'),
	app = express(),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	config = require('./config'),
	bodyParser = require('body-parser'),
	cors = require('cors');


mongoose.connect(config.database, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 
	extended: false 
}));

// parse application/json
app.use(bodyParser.json());

app.use(cors({
	origin: 'http://localhost:3000'
}));

// Set up Routes for the application
var user = require('./app/routes/user')();
var product = require('./app/routes/product')();
app.use('/user', user);
app.use('/product', product);

app.listen(config.port, function(err) {
	if ( err ) {
		console.error(error);
	} else {
		console.log('Server is running on ' + config.port);
	}
});
