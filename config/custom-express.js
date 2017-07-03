var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../services/Logger.js');

module.exports = function() {
	var app = express();

	app.use(morgan('common', {
		stream: {
			write: function(mensagem) {
				logger.info(mensagem);
			}
		}
	}));

	app.use(bodyParser.json());

	app.use(expressValidator());

	app.use(express.static('public'));

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	consign()
		.include('controllers')
		.then('persistence')
		.then('services')
		.into(app);

	return app;
};
