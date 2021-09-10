import express from 'express';
import { createConnection } from 'typeorm';
import routes from './routes';
import cors from 'cors';

import dotenv  from 'dotenv';

//Carrega cvariáveis de ambiente
dotenv.config();

//Pega a porta da variável de ambiente
const PORT = process.env.PORT || 3333;

//Instancio a aplicação
const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //body-parser

//Routes
app.use(routes);

createConnection().then(connection => {

    //Levanto a aplicação
    app.listen(PORT, () => {
        console.log(`Running in port ${PORT}`);
    })

}).catch(error => {
    console.log('Ops, não conectei no banco de dados', error);
})