function EstacionamentoDAO(pool) {
	this._pool = pool;
}

EstacionamentoDAO.prototype.salva = function(estacionamento, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('INSERT INTO estacionamentos SET ?', estacionamento, callback);
	});
}

EstacionamentoDAO.prototype.atualiza = function(estacionamento, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('UPDATE estacionamentos SET ? WHERE id = ?', [estacionamento, estacionamento.id], callback);
	});
}

EstacionamentoDAO.prototype.salvaValores = function(estacionamentoValores, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('INSERT INTO estacionamentos_valores SET ?', estacionamentoValores, callback);
	});
}

EstacionamentoDAO.prototype.atualizaValores = function(estacionamentoValores, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('UPDATE estacionamentos_valores SET ? WHERE id = ?', [estacionamentoValores, estacionamentoValores.id], callback);
	});
}

EstacionamentoDAO.prototype.lista = function(callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM estacionamentos', callback);
	});
}

EstacionamentoDAO.prototype.buscaPorId = function(id, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM estacionamentos WHERE id = ?', id, callback);
	});
}

EstacionamentoDAO.prototype.listaPorIdUsuario = function(id_usuario, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM estacionamentos WHERE id_usuario = ?', id_usuario, callback);
	});
}

EstacionamentoDAO.prototype.listaValoresPorIdEstacionamento = function(id_estacionamento, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT ev.*, tv.descricao FROM estacionamentos_valores ev JOIN tipos_veiculos tv ON ev.id_tipo_veiculo = tv.id WHERE id_estacionamento = ? ORDER BY ev.id_tipo_veiculo', id_estacionamento, callback);
	});
}

module.exports  = function() {
	return EstacionamentoDAO;
}