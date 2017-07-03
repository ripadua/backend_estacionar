var logger = require('../services/Logger.js');

module.exports = function(app) {

	app.get('/api/tiposVeiculos', function(req, res){
		console.log('Listando tipos de veiculos');

		var connection = app.persistence.connectionFactory();
		var tipoVeiculoDAO = new app.persistence.TipoVeiculoDAO(connection);

		tipoVeiculoDAO.lista(function(erro, resultado){
			if (erro) {
				console.log('Erro ao listar tipos de veiculos: ' + erro);
				res.status(500).send(erro);
			} else {
				res.status(200).json(resultado);
			}
		});
	});

};
