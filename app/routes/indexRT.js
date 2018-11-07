module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.indexDAO.index(application, req, res);
	});

	application.post('/auth', function(req, res){
		application.app.controllers.indexDAO.authenticate(application, req, res);
	});
}