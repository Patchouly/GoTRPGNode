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
    var jogoEntity = new application.app.models.jogoEntity(connDB);

    var info = [];

    userEntity.insertUser(dadosForm, res); //O callback já redireciona a página (userEntity)
    info.push({msg: 'Usuário Cadastrado'});
    jogoEntity.generateAttributes(dadosForm.usuario, res);
    info.push({msg: 'Atributos gerados'});

    res.render('index', {validacao: {}, dadosForm: {}, info: info });
}