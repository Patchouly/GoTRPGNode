module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.indexDAO.index(application, req, res);
	});
}