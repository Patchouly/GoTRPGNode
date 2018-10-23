module.exports = function(application){
	application.get('/jogo', function(req, res){
		application.app.controllers.jogoDAO.jogo(application, req, res)
	});
}