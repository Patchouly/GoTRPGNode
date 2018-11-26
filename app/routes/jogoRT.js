module.exports = function(application){
	application.get('/jogo', function(req, res){
		application.app.controllers.jogoDAO.jogo(application, req, res)
	});

	application.get('/logout', function(req, res){
		application.app.controllers.jogoDAO.logout(application, req, res);
	});

	application.get('/suditos', function(req, res){
		application.app.controllers.jogoDAO.suditos(application, req, res);
	});

	application.get('/pergaminhos', function(req, res){
		application.app.controllers.jogoDAO.pergaminhos(application, req, res);
	});

	application.post('/order', function(req, res){
		application.app.controllers.jogoDAO.ordenar(application, req, res);
	});
}