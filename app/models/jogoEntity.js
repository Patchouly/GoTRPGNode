function jogoEntity(connDB) {
    this._connection = connDB; //Underline implica que a variavel é privada
}

jogoEntity.prototype.generateAttributes = function(dadosForm, res) {
    var attributes = {
        user: dadosForm,
        moeda: 15, 
        suditos: 100, 
        // random gera um valor aleatorio entre 0 e 1
        // * 1000 para multiplicar o valor seja qual for por 1000
        // floor remove as casas decimais
        // resultando em um numero randomico entre 0 e 1000
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
    }

    var dados = {
        operacao: "inserir", //string com a operação filtrada no switch
        dadosForm: attributes,
        collection: "jogo", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( err ){
                console.log(err);
                res.render('cadastro', {validacao : {}, dadosForm : dadosForm});
            } else {
            }
        }
    };
    this._connection(dados);
}

jogoEntity.prototype.iniciarJogo = function(req, res, con_error) {
    var dados = {
        operacao: "find", //string com a operação filtrada no switch
        query: {user: {$eq: req.session.user}}, //query de execução
        collection: "jogo", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( result[0] != undefined ){
                var erro = []
                if (con_error == 'y') {
                    erro.push({msg: 'Ordem incompleta'});
                }
                res.render('jogo', {house: req.session.house, validacao : erro, info : {}, jogo: result[0]});
            } else {
            }
        }
    };
    this._connection(dados);
}

jogoEntity.prototype.order = function(req, res, dadosForm) {
    var dados = {
        operacao: "find", //string com a operação filtrada no switch
        query: {user: {$eq: req.session.user}}, //query de execução
        collection: "jogo", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( result[0] != undefined ){
                var erro = []
                if (con_error == 'y') {
                    erro.push({msg: 'Ordem incompleta'});
                }
                res.render('jogo', {house: req.session.house, validacao : erro, info : {}, jogo: result[0]});
            } else {
            }
        }
    };
    this._connection(dados);
}

module.exports = function () {
    return jogoEntity;
}