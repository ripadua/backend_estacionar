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
				res.status(200).send(resultado);
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
				res.status(200).send(resultado);
			}
		});

	});

	app.post('/estacionamentos', function(req, res){
		console.log('Processando uma inclusão de estacionamento.');

		req.assert("estacionamento.veiculo", "O tipo de veiculo é obrigatório.").notEmpty();
		req.assert("estacionamento.placa", "A placa é obrigatória").notEmpty().len(7,7);
		req.assert("estacionamento.datahora_entrada", "A data e hora de entrada é obrigatória").notEmpty();
		req.assert("estacionamento.cartao", "O número do cartão é obrigatório").notEmpty();
	});
};