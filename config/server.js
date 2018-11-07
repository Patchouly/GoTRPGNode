/* TODO list
* -
* - Install Node.js https://nodejs.org (testar no CMD com o comando {node -v})
* - Testar se o NPM foi instalado junto com o nodejs {npm -v}
*
* - npm config set proxy http://<username>:<password>@<proxy-server-url>:<port>
* - npm config set https-proxy http://<username>:<password>@<proxy-server-url>:<port>
*
* - git config --global http.proxy http://username:password@proxiURL:proxiPort
*
* - Escolhe um diretório para o novo projeto NodeJs e inicia o NPM {npm init} (cria um projeto node na pasta selecionada)
* - Testar o novo projeto com o comando {node <app>}
* - Instala o Express {npm install express --save} (--save inclue a instalação na pasta node_modules do projeto)
* - Instalar EJS {npm install ejs --save} (Estrutura de página HTML com abertura para javascript server side)
* - Instalar o NodeMon {npm install -g nodemon} (plugin que recompila o código ao perceber qualquer alteração no codigo fonte, -g instala de forma global)
* - Testar o nodemon passando a levantar a aplicação com o comando {nodemon <app>}
* - Instala modulo do banco de dados {npm install mongo --save} (mongo = plugin do MongoDB)
* - Instalar o consign {npm install consign --save} (plugin que facilita a localização das rotas e módulos)
* - Instalar body-parser {npm install body-parser --save} (plugin do express para preencher os dados enviados pelo post no model)
* - Instalar express validator {npm install express-validator --save} (plugin que valida os dados do post)
* - Instalar express-session {npm install express-session --save} (plugin para manipular cookies)
*/

/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-session */
var expressSession = require('express-session');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views/pages');

/* configurar o middleware express.static */
app.use(express.static('./app/views/assets'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware express-session */
app.use(expressSession({
	secret: 'deadwood86deadwood86', //key pra assinar cookies de sessao
	resave: false, //re-escreve save
	saveUninitialized: false //criar sessao nova sempre que for modificada
}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/connectionDB.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;