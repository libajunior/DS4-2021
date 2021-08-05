const express = require('express');
const router = express.Router();
const { User } = require('../models')

router.post('/signup', async (req, res) => {
    const user = req.body;

    //Poderia utilizar o findOrCreate, mas vou fazer do jeito "didático", verificando se encontro um registro com o email
    User.findOne({ where: { email: user.email } })
        .then(result => {
            
            //Se encontrar, devolve que já existe e aborta daqui para frente
            if (result) {
                res.status(409).send('Já existe um usuário com este e-mail');
                return;
            }
            
            //Tento criar um usuario novo...
            return User.create(user);
        })
        .then(result => {
            //... se deu certo, devolvo ele!
            res.send(result);
        })
        .catch(error => {
            //Deu erro? Retorna a mensagem do erro...
            res.status(500).send(error.message);
        });
});

module.exports = router;