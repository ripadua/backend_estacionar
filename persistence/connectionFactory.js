var mysql = require('mysql');

function createDBConnection() {
	if (!process.env.NODE_ENV) {
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'admin',
			database : 'estacionar'
		});	
	}

	if (process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'admin',
			database : 'estacionar_test'
		});
	}

	if (process.env.NODE_ENV == 'production') {
		return mysql.createConnection({
			connectionLimit: 10,
			host : 'us-cdbr-iron-east-03.cleardb.net',
			user : 'baeccbdddd1956',
			password : '6b3ab70d',
			database : 'heroku_2e29aadf5b10c4b'
		});
	}
}

//wrapper    
module.exports = function() {
	return createDBConnection;
}	