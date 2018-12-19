var crypto = require("crypto");//Importa o modulo do crypto

function userEntity(connDB) {
    this._connection = connDB; //Underline implica que a variavel é privada
}

userEntity.prototype.insertUser = function (dadosForm, res){

    dadosForm.senha = crypto.createHash("md5").update(dadosForm.senha).digest("hex"); //criptografa em md5

    var dados = {
        operacao: "insert", //string com a operação filtrada no switch
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

    dadosForm.pass = crypto.createHash("md5").update(dadosForm.pass).digest("hex"); //criptografa em md5
    
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