var mongo = require('mongodb');

//faz com que não conecte com o banco ao subir o servidor
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
}

module.exports = function() {
    return connMongoDB; //retorna um objeto com a conexão, sem necessariamente conecta-lo
}