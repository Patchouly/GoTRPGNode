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
        operacao: "insert", //string com a operação filtrada no switch
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
    switch(dadosForm.acao){
        case 1: 
            duration = 1 * 1 * 60000;
            break;
        case 2: 
            duration = 2 * 1 * 60000;
            break;
        case 3: 
            duration = 5 * 1 * 60000;
            break;
        case 4: 
            duration = 5 * 1 * 60000;
            break;
    }
    var attributes = {
        user: req.session.user,
        timeout: date.getTime() + duration, //retorna o valor em mili entre 01/01/1970 até hoje
        qtd: dadosForm.qtd,
    };

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
    console.log(dados);
    this._connection(dados);
}

module.exports = function () {
    return jogoEntity;
}