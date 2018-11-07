function userEntity(connDB) {
    this._connection = connDB; //Underline implica que a variavel é privada
}

userEntity.prototype.insertUser = function (user, res){
    /* versão MongoDB 2.0
    this._connection.open( function(err, mongoClient){
        mongoClient.collection("users", function(err, collection) {
            collection.insert(user);
        });
    }); //abre conexão MongoDB
    */
    var dados = {
        operacao: "inserir", //string com a operação filtrada no switch
        user: user,
        collection: "user", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
        }
    };
    this._connection(dados);
}

userEntity.prototype.authenticate = function (dadosForm, req, res){
    var dados = {
        operacao: "findAuth", //string com a operação filtrada no switch
        query: {usuario: {$eq: dadosForm.user}, senha: {$eq: dadosForm.pass}}, //query de execução
        collection: "user", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            console.log(result);
            if ( result[0] != undefined ){
                req.session.loged = true;// Criar variavel de sessao
                req.session.user = result[0].user;
                req.session.house = result[0].casa
            }
            if (req.session.loged) {
                res.redirect("jogo");
            } else {
                res.render("index", {validacao: {}});
            }
        }
    };
    this._connection(dados);
}

module.exports = function () {
    return userEntity;
}