module.exports.jogo = function(application, req, res) {
    if (!req.session.loged) {
        res.render("index", {validacao : [{msg: 'Usuário não autenticado'}], dadosForm : {}, info: {} });
        return;
    }

    var user = req.session.user;

    var connDB = application.config.connectionDB;

    var jogoEntity = new application.app.models.jogoEntity(connDB);

    jogoEntity.iniciarJogo(user);

    res.render('jogo', {house: req.session.house, validacao : {}, info : {}});
}

module.exports.logout = function(application, req, res) {
    req.session.destroy(function(err) {
        res.render("index", {validacao : {}, dadosForm : {}, info: [{msg: 'Desconectado'}] });
    });
}