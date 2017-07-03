var logger = require('../services/Logger.js');

module.exports = function(app) {

	app.post('/api/entradas', function(req, res){
		console.log('Processando uma inclusão de entrada.');

		req.assert("entrada.id_tipo_veiculo", "O tipo de veiculo é obrigatório.").notEmpty();
		req.assert("entrada.id_estacionamento", "O tipo de veiculo é obrigatório.").notEmpty();
		req.assert("entrada.placa", "A placa é obrigatória").notEmpty().len(7,7);
		req.assert("entrada.datahora_entrada", "A data e hora de entrada é obrigatória").notEmpty();
		req.assert("entrada.cartao", "O número do cartão é obrigatório").notEmpty();

		var erros = req.validationErrors();

		if (erros) {
			console.log('Erros de validação encontrados.');
			res.status(400).send(erros);
			return;
		}

		var entrada = req.body["entrada"];

		var datahora_formatada = entrada.datahora_entrada.replace("Z", "+03:00");
		entrada.datahora_entrada = new Date(datahora_formatada);

		console.log(entrada);

		var connection = app.persistence.connectionFactory();
		var entradaDAO = new app.persistence.EntradaDAO(connection);

		entradaDAO.salva(entrada, function(erro, resultado){
			if (erro) {
				console.log('Erro ao salvar entrada: ' + erro);
				res.status(500).send(erro);
			} else {
				entrada.id = resultado.insertId;
				res.status(201).json(entrada);
			}
		});
	});

	app.put('/api/entradas', function(req, res){
		console.log('Processando uma finalização de entrada.');

		req.assert("entrada.id", "O id da entrada é obrigatória.").notEmpty();
		req.assert("entrada.id_tipo_veiculo", "O tipo de veiculo é obrigatório.").notEmpty();
		req.assert("entrada.id_estacionamento", "O tipo de veiculo é obrigatório.").notEmpty();
		req.assert("entrada.placa", "A placa é obrigatória").notEmpty().len(7,7);
		req.assert("entrada.cartao", "O número do cartão é obrigatório").notEmpty();
		req.assert("entrada.datahora_entrada", "A data e hora de entrada é obrigatória").notEmpty();
		req.assert("entrada.datahora_saida", "A data e hora da saída é obrigatória").notEmpty();
		req.assert("entrada.total_tempo", "O total de tempo é obrigatório").notEmpty();
		req.assert("entrada.valor_pago", "O valor pago é obrigatório").notEmpty();
		req.assert("entrada.total_pagar", "O total a pagar é obrigatório").notEmpty();

		var erros = req.validationErrors();

		if (erros) {
			console.log('Erros de validação encontrados.');
			res.status(400).send(erros);
			return;
		}

		var entrada = req.body["entrada"];

		var datahora_entrada_formatada = entrada.datahora_entrada.replace("Z", "+03:00");
		entrada.datahora_entrada = new Date(datahora_entrada_formatada);


		var datahora_saida_formatada = entrada.datahora_saida.replace("Z", "+03:00");
		entrada.datahora_saida = new Date(datahora_saida_formatada);

		console.log(entrada);

		var connection = app.persistence.connectionFactory();
		var entradaDAO = new app.persistence.EntradaDAO(connection);

		entradaDAO.atualiza(entrada, function(erro, resultado){
			if (erro) {
				console.log('Erro ao finalizar entrada: ' + erro);
				res.status(500).send(erro);
			} else {
				res.status(200).json(entrada);
			}
		});
	});

};
