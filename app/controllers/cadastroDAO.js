module.exports.cadastro = function(application, req, res) {
    res.render('cadastro', {validacao : {}, dadosForm : {}});
}

module.exports.cadastrar = function(application, req, res) {

    var dadosForm = req.body;

    req.assert('nome', 'Campo nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Campo usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'Campo senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Uma casa deve ser escolhida').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('cadastro', {validacao : errors, dadosForm : dadosForm});
        return;
    }

    var connDB = application.config.connectionDB;

    var userEntity = new application.app.models.userEntity(connDB);

    userEntity.insertUser(dadosForm);

    res.send('Cadastrado');
}