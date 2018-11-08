module.exports.index = function(application, req, res) {
    res.render('index', {validacao : {}, dadosForm : {}, info: {}});
}

module.exports.authenticate = function(application, req, res) {
    var dadosForm = req.body;

    req.assert('user', 'Campo usuário não pode ser vazio').notEmpty();
    req.assert('pass', 'Campo senha não pode ser vazio').notEmpty();

    var errors = req.validationErrors(); //colhe os erros de validação client-side

    if (errors) {
        res.render('index', {validacao : errors, dadosForm : dadosForm, info: {}});
        return;
    }

    var connDB = application.config.connectionDB;
    var userEntity = new application.app.models.userEntity(connDB);

    userEntity.authenticate(dadosForm, req, res); //O callback já redireciona a página (userEntity)
}