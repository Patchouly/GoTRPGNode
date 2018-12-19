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
        const db = client.db(dbName); //referencia do banco de dados
        query(db, dados); //efetiva as operações
        client.close(); //fecha a conexão
    });
}

//função criada para evitar repetiçao de codigo
function query(db, dados) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "insert":
            collection.insertOne(dados.dadosForm, dados.callback);
            break;
        case "find":
            collection.find(dados.query).toArray(dados.callback); 
            break;
        case "update":
            //collection.find(dados.query).toArray(dados.callback);
            break;
        case "updateInc":
            collection.update(dados.query, dados.update);
            break;
        case "remove":
            collection.remove(dados.query);
            break;
        default:
            break;
    }
}

module.exports = function() {
    return connMongoDB; //retorna um objeto com a conexão, sem necessariamente conecta-lo
}