const Responsavel = require('../models/responsavel');
//CREATE Responsavel
const create = async(req, res) => {
    try{
        const newResponsavel = new Responsavel(req.body);
        if(!newResponsavel.nome) return res.status(400).send({message: 'Nome do Responsável não enviado '});
        if(!newResponsavel.email) return res.status(400).send({message: 'CPF do Responsável não enviado '});
        if(!newResponsavel.senha) return res.status(400).send({message: 'Nível de Permissão do Responsável não enviado '});

        await newResponsavel.save(function (err) {
            if(!err){
                return res.status(201).send({message: 'Responsável cadastrado com sucesso'});
            }
            else if(err.code === 11000){
                console.log(err);
                return res.status(400).send({message: 'Responsável já está cadastrado'});
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
//READ Responsavel
const getAll = async(req, res) => {
    try{
        const responsavel = await Responsavel.find({}).select({_id: 0, _v: 0});
        return res.status(200).send(responsavel);
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};
//GetOne por nome de Responsável
const getOne = async(req, res) => {
    try{
        const responsavel = await Responsavel.findOne({nome: req.params.nome.toUpperCase()}).select({_id: 0, _v: 0});

        if(!responsavel) return res.status(404).send({message: 'Responsável não encontrado'});
        //retorna o primeiro responsavel encontrado
        else return res.status(200).send(responsavel);
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

//UPDATE Responsável
const update = async(req, res) => {
    try{
        const responsavel = await Responsavel.findOne({nome: req.params.nome.toUpperCase()});

        if(!responsavel) return res.status(404).send({message: 'Responsável não encontrado'});
        //para não alterar o nome do Responsável
        if(req.body.nome) delete req.body.nome;

        await Object.assign(responsavel, req.body).save();
        return res.status(200).send({message: 'Responsável atualizado'});
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};
//Apagar um Responsavel
const remove = async(req, res) => {
    try{
        const responsavel = await Responsavel.findOneAndRemove({nome: req.params.nome.toUpperCase()}).select({_id: 0, _v: 0});

        if(!responsavel) return res.status(404).send({message: 'responsavel não encontrado'});

        return res.status(200).send({message: 'responsavel deletado com sucesso'});
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove

};