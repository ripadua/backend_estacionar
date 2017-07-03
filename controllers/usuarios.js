var logger = require('../services/Logger.js');

module.exports = function(app) {
	app.get('/api/usuarios', function(req, res){
		console.log('Recebida requisição de teste.');
		res.send('OK.');
	});

	app.post('/api/usuarios/autenticarUsuario', function(req, res){

		console.log('Processando uma autenticação de usuário.');

		req.assert("usuario.login", "O login é obrigatório.").notEmpty();
		req.assert("usuario.senha", "A senha é obrigatória").notEmpty();

		var erros = req.validationErrors();

		if (erros) {
			console.log('Erros de validação encontrados.');
			res.status(400).send(erros);
			return;
		}

		var usuario = req.body["usuario"];

		console.log(usuario);

		var connection = app.persistence.connectionFactory();
		var usuarioDAO = new app.persistence.UsuarioDAO(connection);

		usuarioDAO.buscaPorLoginESenha(usuario, function(erro, resultado){
			if (erro) {
				console.log('Erro ao autenticar usuario: ' + erro);
				res.status(500).send(erro);
			} else {
				console.log(resultado);
				if (resultado.length > 0) {
					if (resultado[0].ativo) {
						res.status(200).send(resultado[0]);
					} else {
						res.status(402).send();
					}
				} else {
					res.status(401).send();
				}

			}
		});

	});
}
