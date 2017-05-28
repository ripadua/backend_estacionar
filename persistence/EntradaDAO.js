function EntradaDAO(pool) {
	this._pool = pool;
}

EntradaDAO.prototype.salva = function(entrada, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('INSERT INTO entradas SET ?', entrada, callback);
	});
}

EntradaDAO.prototype.atualiza = function(entrada, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('UPDATE entradas SET status = ? WHERE id = ?', [entrada.status, entrada.id], callback);
	});
}

EntradaDAO.prototype.lista = function(callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM entradas', callback);
	});
}

EntradaDAO.prototype.buscaPorId = function(id, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM entradas WHERE id = ?', id, callback);
	});
}

module.exports  = function() {
	return EntradaDAO;
}