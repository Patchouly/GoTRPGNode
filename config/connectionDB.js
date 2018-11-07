//versão 4.0
var mongo = require("mongodb").MongoClient;
var assert = require('assert'); //verifica erros na conexão do DB
// Connection URL
const dbName = "got";
const url = 'mongodb://localhost:27017/'+dbName;

//faz com que não conecte com o banco ao subir o servidor
//metodo wrapper
var connMongoDB = function(dados) { //dados são passados como parametros
    mongo.connect(url, { useNewUrlParser: true }, function(err, client){
        assert.equal(null, err); //verifica erros na conexão
        console.log('Carregou conexão');
        const db = client.db(dbName); //referencia do banco de dados
        query(db, dados); //efetiva as operações
        client.close(); //fecha a conexão
    });
}

//função cirada para evitar repetiçao de codigo
function query(db, dados) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":
            collection.insertOne(dados.user, dados.callback);
            break;
        default:
            break;
    }
}

//versaõ 2.0
/*var mongo = require('mongodb');

//faz com que não conecte com o banco ao subir o servidor
//metodo wrapper
var connMongoDB = function() { 
    console.log('Carregou conexão');
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost',
            '27017',
            {}
        ),
        {}
    );
	return db;
}*/

module.exports = function() {
    return connMongoDB; //retorna um objeto com a conexão, sem necessariamente conecta-lo
}