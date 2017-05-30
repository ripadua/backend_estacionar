var logger = require('../services/Logger.js');

module.exports = function(app) {

	app.get('/estacionamentos/:id_usuario', function(req, res){
		console.log('Processando uma consulta de estacionamento.');

		var id_usuario = req.params.id_usuario;

		var connection = app.persistence.connectionFactory();
		var estacionamentoDAO = new app.persistence.EstacionamentoDAO(connection);

		estacionamentoDAO.listaPorIdUsuario(id_usuario, function(erro, resultado){
			if (erro) {
				console.log('Erro ao consultar estacionamento: ' + erro);
				res.status(500).send(erro);
			} else {
				res.status(200).json(resultado);
			}
		});
	});

	app.get('/estacionamentos/:id/valores', function(req, res){
		console.log('Processando uma consulta de valores de estacionamento.');

		var id = req.params.id;

		var connection = app.persistence.connectionFactory();
		var estacionamentoDAO = new app.persistence.EstacionamentoDAO(connection);

		estacionamentoDAO.listaValoresPorIdEstacionamento(id, function(erro, resultado){
			if (erro) {
				console.log('Erro ao consultar valores de estacionamento: ' + erro);
				res.status(500).send(erro);
			} else {
				res.status(200).json(resultado);
			}
		});

	});

	app.post('/estacionamentos', function(req, res){
		console.log('Processando uma inclusão de estacionamento.');

		req.assert("estacionamento.nome", "O nome do estacionamento é obrigatório.").notEmpty();
		req.assert("estacionamento.id_usuario", "O usuário é obrigatório").notEmpty();

		var erros = req.validationErrors();

		if (erros) {
			console.log('Erros de validação encontrados.');
			res.status(400).send(erros);
			return;
		}

		var estacionamento = req.body["estacionamento"];

		var connection = app.persistence.connectionFactory();
		var estacionamentoDAO = new app.persistence.EstacionamentoDAO(connection);

		estacionamentoDAO.salva(estacionamento, function(erro, resultado){
			if (erro) {
				console.log('Erro ao criar estacionamento: ' + erro);
				res.status(500).send(erro);
			} else {
				console.log('Estacionamento criado');
				estacionamento.id = resultado.insertId;
				res.status(201).json(resultado);
			}
		});
	});
};