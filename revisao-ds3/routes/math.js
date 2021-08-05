const express = require('express');
const router = express.Router();

// Endpoint 1
router.get('/soma', (req, res) => {
    //Pego o conteúdo dos parâmetros "a" e "b" a associo às constantes de mesmo nome
    const {a, b} = req.query;

    //Verifico se o parâmetro "a" existe ou se é numérico, caso contrário, retorno BAD REQUEST (400)
    if ((!a)||(Number.isNaN(Number(a)))) {
        res.status(400).send('Informe um valor numérico para o parâmetro "a"');
        return
    }

    //Verifico se o parâmetro "b" existe ou se é numérico, caso contrário, retorno BAD REQUEST (400)
    if ((!b)||(Number.isNaN(Number(b)))) {
        res.status(400).send('Informe um valor numérico para o parâmetro "b"');
        return
    }
        
    //Converto as constantes para numérico e somo os valores
    const valor = Number(a) + Number(b);
    res.send(`A soma dos valores é ${valor}`);
})

// Endpoint 2
router.get('/divide', (req, res) => {
    //Pego o conteúdo dos parâmetros "a" e "b" a associo às constantes de mesmo nome
    const {a, b} = req.query;

    //Verifico se o parâmetro "a" existe ou se é numérico, caso contrário, retorno BAD REQUEST (400)
    if ((!a)||(Number.isNaN(Number(a)))) {
        res.status(400).send('Informe um valor numérico para o parâmetro "a"');
        return
    }

    //Verifico se o parâmetro "b" existe ou se é numérico, caso contrário, retorno BAD REQUEST (400)
    if ((!b)||(Number.isNaN(Number(b)))) {
        res.status(400).send('Informe um valor numérico para o parâmetro "b"');
        return
    }

    try {
        if (Number(b) === 0) {
            throw new Error('Ops! Divisão por zero não rola');
        }
        //Ver
        const valor = Number(a) / Number(b); 
        res.send(`A soma dos valores é ${valor}`);   

    } catch (error) {
        res.status(500).send(error.message);
    }    
})

module.exports = router;