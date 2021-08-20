import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

//Cerraga variáveis de ambiente
dotenv.config();

class TokenController {

    //Verifico se o token é válido
    public validate(request: Request, response: Response, next: NextFunction) {
        try {
            //Pega o authorization do cabeçalho do HTTP
            const authorization = request.headers.authorization || '';

            //Verifico se o token está vindo pelo modo Bearer
            if (authorization && authorization.split(' ')[0] === 'Bearer') {

                //Pega o valor do token
                const token = authorization.split(' ')[1];

                try {
                    //Verifico se o token é válido
                    const criptoKey = process.env.CRIPTO_KEY as string;
                    verify(token, criptoKey);

                    //Tudo certo, então segue para o próximo fluxo
                    next();
                } catch (error) {
                    if (error.name === 'TokenExpiredError') {
                        return response.status(401).json('O token expirou')
                    } else {
                        return response.status(401).json('O token inválido')
                    }
                }
            } else {
                return response.status(400).json('Um token válido é requirido')
            }

        } catch (error) {
            return response.status(error.code).json(error)
        }
    }

}

export default new TokenController();