module.exports.jogo = function(application, req, res) {
    if (!req.session.loged) {
        res.render("index", {validacao : [{msg: 'Usuário não autenticado'}], dadosForm : {}, info: {} });
        return;
    }

    var con_error = 'n';
    if (typeof req.query.con_error !== 'undefined' && req.query.con_error == 'y') {
        con_error = 'y';
    }

    var connDB = application.config.connectionDB;
    var jogoEntity = new application.app.models.jogoEntity(connDB);

    jogoEntity.iniciarJogo(req, res, con_error);
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
    req.assert("quantidade","Me diga quantos!").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.redirect('jogo?con_error=y');
        //res.render('jogo', {house: house, validacao : errors, info : {}, jogo: result[0]});
        return;
    }
    console.log(dadosForm);
    res.send('Okie Dokie!');

    var connDB = application.config.connectionDB;
    var jogoEntity = new application.app.models.jogoEntity(connDB);

    jogoEntity.order(req, res, dadosForm);
}

