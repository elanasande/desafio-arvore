const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criar esquema para o Usuario: Criança
const criancaModel = new Schema({
    nome: {
        type: String,
        required: true,
        uppercase: true
    },
    nascimento: {
        required: true,
        type: String
    },
    apelido: {
        type: String
    },
    genero: {
        type: String
    },
    nivelPermissao: {
        type: Boolean
    }
});

module.exports= mongoose.model('Crianca', criancaModel);
