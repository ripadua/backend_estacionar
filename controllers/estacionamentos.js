var logger = require('../services/Logger.js');

module.exports = function(app) {

	app.get('/api/estacionamentos/:id_usuario', function(req, res){
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

	app.get('/api/estacionamentos/:id/valores', function(req, res){
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

	app.get('/api/estacionamentos/:id/entradas', function(req, res){
		console.log('Processando uma listagem de entradas de um estacionamento.');

		var id = req.params.id;

		var connection = app.persistence.connectionFactory();
		var entradaDAO = new app.persistence.EntradaDAO(connection);

		entradaDAO.listaPorIdEstacionamento(id, function(erro, resultado){
			if (erro) {
				console.log('Erro ao consultar lista de entradas de um estacionamento: ' + erro);
				res.status(500).send(erro);
			} else {
				res.status(200).json(resultado);
			}
		});

	});

	app.get('/api/estacionamentos/:id/despesas', function(req, res){
		console.log('Processando uma listagem de despesas de um estacionamento.');

		var id = req.params.id;

		var connection = app.persistence.connectionFactory();
		var despesaDAO = new app.persistence.DespesaDAO(connection);

		despesaDAO.listaPorIdEstacionamento(id, function(erro, resultado){
			if (erro) {
				console.log('Erro ao consultar lista de despesas de um estacionamento: ' + erro);
				res.status(500).send(erro);
			} else {
				res.status(200).json(resultado);
			}
		});

	});

	app.post('/api/estacionamentos', function(req, res){
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

		var dataAtual = new Date();
		dataAtual = new Date(dataAtual.toISOString().replace("Z", "+03:00"));

		estacionamento.datahora_inclusao = dataAtual;

		var connection = app.persistence.connectionFactory();
		var estacionamentoDAO = new app.persistence.EstacionamentoDAO(connection);

		var estacionamentoValores = estacionamento.estacionamentoValores;
		delete estacionamento.estacionamentoValores;

		estacionamentoDAO.salva(estacionamento, function(erro, resultado){
			if (erro) {
				console.log('Erro ao criar estacionamento: ' + erro);
				res.status(500).send(erro);
			} else {
				estacionamento.id = resultado.insertId;

				for (var x in estacionamentoValores) {
					estacionamentoValores[x].id_estacionamento = estacionamento.id;
					delete estacionamentoValores[x].descricao;

					var connection = app.persistence.connectionFactory();
					var estacionamentoDAO = new app.persistence.EstacionamentoDAO(connection);

					estacionamentoDAO.salvaValores(estacionamentoValores[x], function(erroValores, resultadoValores){
						if (erroValores) {
							console.log('Erro ao salvar Valores: ' + erroValores);
						}
					});
				}
				res.status(201).json(estacionamento);
			}
		});
	});

	app.put('/api/estacionamentos', function(req, res){
		console.log('Processando uma atualização de estacionamento.');

		req.assert("estacionamento.nome", "O nome do estacionamento é obrigatório.").notEmpty();
		req.assert("estacionamento.id_usuario", "O usuário é obrigatório").notEmpty();

		var erros = req.validationErrors();

		if (erros) {
			console.log('Erros de validação encontrados.');
			res.status(400).send(erros);
			return;
		}

		var estacionamento = req.body["estacionamento"];

		var dataAtual = new Date();
		dataAtual = new Date(dataAtual.toISOString().replace("Z", "+03:00"));

		estacionamento.datahora_alteracao = dataAtual;
		delete estacionamento.datahora_inclusao;

		var connection = app.persistence.connectionFactory();
		var estacionamentoDAO = new app.persistence.EstacionamentoDAO(connection);

		var estacionamentoValores = estacionamento.estacionamentoValores;
		delete estacionamento.estacionamentoValores;

		estacionamentoDAO.atualiza(estacionamento, function(erro, resultado){
			if (erro) {
				console.log('Erro ao atualizar estacionamento: ' + erro);
				res.status(500).send(erro);
			} else {

				for (var x in estacionamentoValores) {
					estacionamentoValores[x].id_estacionamento = estacionamento.id;
					delete estacionamentoValores[x].descricao;

					var connection = app.persistence.connectionFactory();
					var estacionamentoDAO = new app.persistence.EstacionamentoDAO(connection);

					estacionamentoDAO.atualizaValores(estacionamentoValores[x], function(erroValores, resultadoValores){
						if (erroValores) {
							console.log('Erro ao atualizar Valores: ' + erroValores);
						}
					});
				}
				res.status(201).json(estacionamento);
			}
		});
	});
};
