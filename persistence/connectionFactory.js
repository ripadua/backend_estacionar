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
			user : 'bef9b42036ce99',
			password : '5ceab37f',
			database : 'heroku_354030aedb907ef'
		});
	}
}

//wrapper    
module.exports = function() {
	return createDBConnection;
}	
