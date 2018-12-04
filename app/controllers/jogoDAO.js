module.exports.jogo = function(application, req, res) {
    if (!req.session.loged) {
        res.render("index", {validacao : [{msg: 'Usuário não autenticado'}], dadosForm : {}, info: {} });
        return;
    }

    var msg = '';
    if (typeof req.query.msg !== 'undefined' && req.query.msg != '') {
        msg = req.query.msg;
    }

    var connDB = application.config.connectionDB;
    var jogoEntity = new application.app.models.jogoEntity(connDB);

    jogoEntity.iniciarJogo(req, res, msg);
}

module.exports.logout = function(application, req, res) {
    req.session.destroy(function(err) {
        res.render("index", {validacao : {}, dadosForm : {}, info: [{msg: 'Desconectado'}] });
    });
}

module.exports.suditos = function(application, req, res) {
    if (!req.session.loged) {
        res.render("index", {validacao : [{msg: 'Usuário não autenticado'}], dadosForm : {}, info: {} });
        return;
    }
    res.render("aldeoes");
}

module.exports.pergaminhos = function(application, req, res) {
    if (!req.session.loged) {
        res.render("index", {validacao : [{msg: 'Usuário não autenticado'}], dadosForm : {}, info: {} });
        return;
    }
    res.render("pergaminhos");
}

module.exports.ordenar = function(application, req, res) {
    if (!req.session.loged) {
        res.render("index", {validacao : [{msg: 'Usuário não autenticado'}], dadosForm : {}, info: {} });
        return;
    }
    var dadosForm = req.body;

    req.assert("acao","Dê a ordem!").notEmpty();
    req.assert("qtd","Me diga quantos!").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.redirect('jogo?msg=error');
        //res.render('jogo', {house: house, validacao : errors, info : {}, jogo: result[0]});
        return;
    }

    var connDB = application.config.connectionDB;
    var jogoEntity = new application.app.models.jogoEntity(connDB);

    jogoEntity.order(req, res, dadosForm);

    res.redirect('jogo?msg=ok');
}

