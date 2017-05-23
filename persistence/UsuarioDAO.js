function UsuarioDAO(connection) {
	this._connection = connection;
}

UsuarioDAO.prototype.salva = function(usuario, callback) {
	this._connection.query('INSERT INTO usuarios SET ?', usuario, callback);
}

UsuarioDAO.prototype.atualiza = function(usuario, callback) {
	this._connection.query('UPDATE usuarios SET status = ? WHERE id = ?', [usuario.status, usuario.id], callback);
}

UsuarioDAO.prototype.lista = function(callback) {
	this._connection.query('SELECT * FROM usuarios', callback);
}

UsuarioDAO.prototype.buscaPorId = function(id, callback) {
	this._connection.query('SELECT * FROM usuarios WHERE id = ?', id, callback);
}

UsuarioDAO.prototype.buscaPorLoginESenha = function(usuario, callback) {
	this._connection.query('SELECT * FROM usuarios WHERE login = ? and senha = ?', usuario.login, usuario.senha, callback);
}

module.exports  = function() {
	return UsuarioDAO;
}