var logger = require('../services/Logger.js');

module.exports = function(app) {

	app.post('/entradas', function(req, res){
		console.log('Processando uma inclusão de entrada.');

		req.assert("entrada.veiculo", "O tipo de veiculo é obrigatório.").notEmpty();
		req.assert("entrada.placa", "A placa é obrigatória").notEmpty().len(7,7);
		req.assert("entrada.datahora_entrada", "A data e hora de entrada é obrigatória").notEmpty();
		req.assert("entrada.cartao", "O número do cartão é obrigatório").notEmpty();
	});
};