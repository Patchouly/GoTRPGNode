module.exports.jogo = function(application, req, res) {
    if (!req.session.loged) {
        res.render("index", {validacao : [{msg: 'Usuário não autenticado'}], dadosForm : {}, info: {} });
        return;
    }

    var connDB = application.config.connectionDB;
    var jogoEntity = new application.app.models.jogoEntity(connDB);

    var user = req.session.user;
    jogoEntity.iniciarJogo(user, req.session.house, res);
}

module.exports.logout = function(application, req, res) {
    req.session.destroy(function(err) {
        res.render("index", {validacao : {}, dadosForm : {}, info: [{msg: 'Desconectado'}] });
    });
}