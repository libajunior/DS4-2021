import express from 'express';
import routes from './routes';

//Instancio a aplicação
const app = express();

//Middleware
app.use(express.json()); //body-parser

//Routes
app.use(routes);

//Levanto a aplicação
app.listen(3000, () => {
    console.log(`Running in port 3000`);
})