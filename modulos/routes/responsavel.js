const router = require('express').Router();
const responsavelController = require('../controllers/responsavel.controller');


responsavelRouter= () => {

    router.route('/')
        //Rota para exibir todos os responsaveis
        .get(responsavelController.getAll)

        //Rota para criar um novo responsavel
        .post(responsavelController.create);
        
    router.route('/:nome')
        //Rota para exibir um unico responsavel
        .get(responsavelController.getOne)

        //Rota para Atualizar responsavel
        .put(responsavelController.update)

        //Rota para Deletar responsavel
        .delete(responsavelController.remove);
    return router;
};

module.exports = responsavelRouter;
