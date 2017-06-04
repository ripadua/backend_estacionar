function DespesaDAO(pool) {
	this._pool = pool;
}

DespesaDAO.prototype.salva = function(despesa, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('INSERT INTO despesas SET ?', despesa, callback);
	});
}

DespesaDAO.prototype.atualiza = function(despesa, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('UPDATE despesas SET ? WHERE id = ?', [despesa, despesa.id], callback);
	});
}

DespesaDAO.prototype.lista = function(callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM despesas', callback);
	});
}

DespesaDAO.prototype.listaPorIdEstacionamento = function(id, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM despesas WHERE id_estacionamento = ?', id, callback);
	});
}

DespesaDAO.prototype.buscaPorId = function(id, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM despesas WHERE id = ?', id, callback);
	});
}

module.exports  = function() {
	return DespesaDAO;
}