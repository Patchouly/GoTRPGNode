function userEntity(connDB) {
    this._connection = connDB; //Underline implica que a variavel é privada
}

userEntity.prototype.insertUser = function (dadosForm, res){
    /* versão MongoDB 2.0
    this._connection.open( function(err, mongoClient){
        mongoClient.collection("users", function(err, collection) {
            collection.insert(dadosForm);-
        });
    }); //abre conexão MongoDB
    */
    var dados = {
        operacao: "inserir", //string com a operação filtrada no switch
        dadosForm: dadosForm,
        collection: "user", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( err ){
                console.log(err);
                res.render('cadastro', {validacao : [{msg: 'Problema durante geração de atributos'}], dadosForm : dadosForm});
            } else {
            }
        }
    };
    this._connection(dados);
}

userEntity.prototype.authenticate = function (dadosForm, req, res){
    var dados = {
        operacao: "find", //string com a operação filtrada no switch
        query: {usuario: {$eq: dadosForm.user}, senha: {$eq: dadosForm.pass}}, //query de execução
        collection: "user", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( result[0] != undefined ){
                req.session.loged = true;// Criar variavel de sessao
                req.session.user = result[0].usuario;
                req.session.house = result[0].casa
                res.redirect("jogo");
            } else {
                req.session.loged = false;
                res.render("index", {validacao: [{msg: 'Campo de usuário ou senha está incorreto'}], dadosForm : dadosForm, info: {}});
            }
        }
    };
    this._connection(dados);
}

module.exports = function () {
    return userEntity;
}