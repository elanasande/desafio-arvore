const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criar esquema para o Livro
const livroModel = new Schema({
    titulo: {
        type: String,
        required: true,
        uppercase: true
    },
    autor: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    lido: {
        type: Boolean
    },
    favorito: {
        type: Boolean
    }
});

module.exports= mongoose.model('Livro', livroModel);