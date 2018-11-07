module.exports.index = function(application, req, res) {
    res.render('index', {validacao : {}, dadosForm : {}});
}

module.exports.authenticate = function(application, req, res) {
    var dadosForm = req.body;

    req.assert('user', 'Campo usuário não pode ser vazio').notEmpty();
    req.assert('pass', 'Campo senha não pode ser vazio').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {validacao : errors, dadosForm : dadosForm});
        return;
    }

    var connDB = application.config.connectionDB;
    var userEntity = new application.app.models.userEntity(connDB);

    userEntity.authenticate(dadosForm, req, res);

    //res.send('Sessão criada');
}