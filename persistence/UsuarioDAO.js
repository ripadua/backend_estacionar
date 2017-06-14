function UsuarioDAO(pool) {
	this._pool = pool;
}

UsuarioDAO.prototype.salva = function(usuario, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('INSERT INTO usuarios SET ?', usuario, callback);
	});
}

UsuarioDAO.prototype.atualiza = function(usuario, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('UPDATE usuarios SET status = ? WHERE id = ?', [usuario.status, usuario.id], callback);
	});
}

UsuarioDAO.prototype.lista = function(callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM usuarios', callback);
	});
}

UsuarioDAO.prototype.buscaPorId = function(id, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM usuarios WHERE id = ?', id, callback);
	});
}

UsuarioDAO.prototype.buscaPorLoginESenha = function(usuario, callback) {
	this._pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM usuarios u JOIN usuarios_periodos up on u.id = up.id_usuario WHERE lower(u.login) = ? and u.senha = ? and up.data_inicio <= CURDATE() and up.data_fim >= CURDATE()', [usuario.login.toLowerCase(), usuario.senha], callback);
		connection.release();
	});
}

module.exports  = function() {
	return UsuarioDAO;
}