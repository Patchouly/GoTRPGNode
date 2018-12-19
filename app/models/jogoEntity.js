var ObjectId = require("mongodb").ObjectId;

function jogoEntity(connDB) {
    this._connection = connDB; //Underline implica que a variavel é privada
}

jogoEntity.prototype.generateAttributes = function(dadosForm, res) {
    var attributes = {
        user: dadosForm,
        moeda: 150, 
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
        operacao: "insert", //string com a operação filtrada no switch
        dadosForm: attributes,
        collection: "jogo", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( err ){
                res.render('cadastro', {validacao : {}, dadosForm : dadosForm});
            } else {
            }
        }
    };
    this._connection(dados);
}

jogoEntity.prototype.iniciarJogo = function(req, res, msg) {
    var dados = {
        operacao: "find", //string com a operação filtrada no switch
        query: {user: {$eq: req.session.user}}, //query de execução
        collection: "jogo", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( result[0] != undefined ){
                var erro = [];
                var info = [];
                if (msg == 'error') {
                    erro.push({msg: 'Ordem incompleta'});
                }
                if (msg == 'ok') {
                    info.push({msg: "Job's Done!"});
                }
                res.render('jogo', {house: req.session.house, validacao : erro, info : info, jogo: result[0]});
            } else {
            }
        }
    };
    this._connection(dados);
}

jogoEntity.prototype.order = function(req, res, dadosForm) {

    var date = new Date();
    var duration = null;
    var coins = null;
    switch(parseInt(dadosForm.acao)){
        case 1: 
            duration = 1 * 10 * 60000;
            coins = -2 * dadosForm.qtd;
            break;
        case 2: 
            duration = 2 * 10 * 60000;
            coins = -3 * dadosForm.qtd;
            break;
        case 3: 
            duration = 4 * 10 * 60000;
            coins = -1 * dadosForm.qtd;
            break;
        case 4: 
            duration = 5 * 10 * 60000;
            coins = -2 * dadosForm.qtd;
            break;
    }
    var attributes = {
        user: req.session.user,
        timeout: date.getTime() + duration, //retorna o valor em mili entre 01/01/1970 até hoje
        qtd: dadosForm.qtd,
        action: dadosForm.acao
    };

    //Insere ordem
    var dados = {
        operacao: "insert", //string com a operação filtrada no switch
        dadosForm: attributes, //query de execução
        collection: "order", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            if ( err ){
                res.render('jogo', {house: req.session.house, validacao : [{msg: 'Insert falhou!'}], info : {}, jogo: {}});
            } else {
            }
        }
    };
    this._connection(dados);

    //autaliza moedas do jogador
    var dados = {
        operacao: "updateInc", //string com a operação filtrada no switch
        query: {user: {$eq: req.session.user}}, //query de execução
        collection: "jogo", //string indicando collection que será manipulada
        update: { $inc: {moeda: coins}}, //atributo e valor do atributo
        callback: function(err, result) { //função que trata a resposta do banco
            if ( err ){
                res.render('jogo', {house: req.session.house, validacao : [{msg: 'Update falhou!'}], info : {}, jogo: {}});
            } else {
            }
        }
    };
    this._connection(dados);
}

jogoEntity.prototype.getOrders = function(req, res, ordersList) {
    var dados = {
        operacao: "find", //string com a operação filtrada no switch
        query: {user: {$eq: req.session.user}}, //query de execução
        collection: "order", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            res.render("pergaminhos", {orders: result});
        }
    };
    this._connection(dados);
}

jogoEntity.prototype.getActiveOrders = function(req, res, ordersList) {
    var dados = {
        operacao: "find", //string com a operação filtrada no switch
        query: {user: {$eq: req.session.user}, timeout: {$gt:new Date.getTime()}}, //query de execução
        collection: "order", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco
            res.render("pergaminhos", {orders: result});
        }
    };
    this._connection(dados);
}

jogoEntity.prototype.removeOrder = function(req, res, dadosForm) {
    var dados = {
        operacao: "deleteOne", //string com a operação filtrada no switch
        query: {_id: {$eq: ObjectId(dadosForm.id)}}, //query de execução
        collection: "order", //string indicando collection que será manipulada
        callback: function(err, result) { //função que trata a resposta do banco         
            res.render('jogo', {house: req.session.house, validacao : {}, info : [{msg: 'Ordem Revogada!'}], jogo: {}});
        }
    };
    this._connection(dados);
}

module.exports = function () {
    return jogoEntity;
}