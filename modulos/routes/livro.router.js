const router = require('express').Router();
const LivroController = require('../controllers/livro.controller');


responsavelRouter= () => {

    router.route('/')
        //Rota para exibir todos os livros
        .get(LivroController.getAll)

        //Rota para criar um novo livro
        .post(LivroController.create);
        
    router.route('/:nome')
        //Rota para exibir um unico livro
        .get(LivroController.getOne)

        //Rota para Atualizar livro
        .put(LivroController.update)

        //Rota para Deletar livro
        .delete(LivroController.remove);
    return router;
};

module.exports = responsavelRouter;
