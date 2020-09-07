const Livro = require('../models/livro.model');

const getAll = async(req, res) => {
    try{
        const livros = await Livro.find({}).select({_id: 0, _v: 0});
        return res.status(200).send(livros);
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const getOne = async(req, res) => {
    try{
        const livro = await Livro.findOne({titulo: req.params.titulo.toUpperCase()}).select({_id: 0, _v: 0});

        if(!livro) return res.status(404).send({message: 'Livro não encontrado'});

        return res.status(200).send(livro);
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const create = async(req, res) => {
    try{
        const newLivro = new Livro(req.body);

        if(!newLivro.titulo) return res.status(400).send({message: 'Titulo do livro não foi mandado'});

        await newLivro.save(function (err) {
            if(!err){
                return res.status(201).send({message: 'Livro cadastrado com sucesso'});
            }
            else if(err.code === 11000){
                console.log(err);
                return res.status(400).send({message: 'Livro já está cadastrado'});
            }
            else{
                return res.status(500).send({error: err, message: 'Erro interno do servidor'});
            }
        });

    }
    catch (err){
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const update = async(req, res) => {
    try{
        const livro = await Livro.findOne({titulo: req.params.titulo.toUpperCase()});

        if(!livro) return res.status(404).send({message: 'Livro não encontrado'});

        if(req.body.titulo) delete req.body.titulo;

        await Object.assign(livro, req.body).save();
        return res.status(200).send({message: 'Livro atualizado'});
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const remove = async(req, res) => {
    try{
        const livro = await Livro.findOneAndRemove({titulo: req.params.titulo.toUpperCase()}).select({_id: 0, _v: 0});

        if(!livro) return res.status(404).send({message: 'Livro não encontrado'});

        return res.status(200).send({message: 'Livro deletado com sucesso'});
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};