function TipoVeiculoDAO(pool) {
	this._pool = pool;
}

TipoVeiculoDAO.prototype.salva = function(tipoVeiculo, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('INSERT INTO tipos_veiculos SET ?', tipoVeiculo, callback);
	});
}

TipoVeiculoDAO.prototype.atualiza = function(tipoVeiculo, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('UPDATE tipos_veiculos SET status = ? WHERE id = ?', [tipoVeiculo.status, tipoVeiculo.id], callback);
	});
}

TipoVeiculoDAO.prototype.lista = function(callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM tipos_veiculos', callback);
	});
}

TipoVeiculoDAO.prototype.buscaPorId = function(id, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM tipos_veiculos WHERE id = ?', id, callback);
	});
}

module.exports  = function() {
	return TipoVeiculoDAO;
}