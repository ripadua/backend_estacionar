var logger = require('../services/Logger.js');

module.exports = function(app) {

	app.post('/api/despesas', function(req, res){
		console.log('Processando uma inclusão de despesa.');

		req.assert("despesa.id_estacionamento", "O id do estacionamento é obrigatório.").notEmpty();
		req.assert("despesa.data", "A data da é obrigatória.").notEmpty();
		req.assert("despesa.descricao", "A descrição é obrigatória").notEmpty();
		req.assert("despesa.valor", "o valor é obrigatório").notEmpty();

		var erros = req.validationErrors();

		if (erros) {
			console.log('Erros de validação encontrados.');
			res.status(400).send(erros);
			return;
		}

		var despesa = req.body["despesa"];

		var data_formatada = despesa.data.replace("Z", "+03:00");
		despesa.data = new Date(data_formatada);

		console.log(despesa);

		var connection = app.persistence.connectionFactory();
		var despesaDAO = new app.persistence.DespesaDAO(connection);

		despesaDAO.salva(despesa, function(erro, resultado){
			if (erro) {
				console.log('Erro ao salvar despesa: ' + erro);
				res.status(500).send(erro);
			} else {
				despesa.id = resultado.insertId;
				res.status(201).json(despesa);
			}
		});
	});

};
