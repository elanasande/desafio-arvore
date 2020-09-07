const express = require('express');
const bodyParser = require('body-parser');

// criar express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configurar db
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Conectar ao Mongo
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successo ao conectar a base de dados");    
}).catch(err => {
    console.log('Não foi possivel conectar ao bd. Exiting now...', err);
    process.exit();
});

// Definindo uma rota 
app.get('/', (req, res) => {
    console.log("Ta funcionando hue ");
    res.json({"message": "Back-end para o Desafio da Árvore"});
});

let port = 8000;
// listen for requests
app.listen(port, () => {
    console.log('Servidor em execução na porta: ' + port);
});

const responsavelRouter = require('./modulos/routes/responsavel');
const livroRouter = require('./modulos/routes/livro.router');

app.use('/responsavel', responsavelRouter());
app.use('/livro', livroRouter());
