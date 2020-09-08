const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criar esquema para o Usuario: Responsavel 
const responsavelModel = new Schema({
    nome: {
        type: String,
        required: true,
        uppercase: true
    },
    nascimento: {
        required: true,
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    telefone: {
        type: String
    },
    senha: {
        type: String
    },
    nivelPermissao: {
        type: Boolean
    }
});

module.exports= mongoose.model('Responsavel', responsavelModel);