module.exports = function(application){
	application.get('/jogo', function(req, res){
		application.app.controllers.jogoDAO.jogo(application, req, res)
	});

	application.get('/logout', function(req, res){
		application.app.controllers.jogoDAO.logout(application, req, res);
	});
}