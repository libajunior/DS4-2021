import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { sign } from 'jsonwebtoken'
import { AppException } from '../exceptions/AppException';

import dotenv from 'dotenv';

//Carrega variáveis de ambiente
dotenv.config();

class AuthController {

    public async create(request: Request, response: Response) {
        
        try {
            
            //Instancio um Repository da classe User
            const repository = getRepository(User);

            //Crio uma instância de User a partir do JSON do request body
            const user = repository.create(request.body);

            //Salvo a instância criada no banco
            const created = await repository.save(user);
            
            //Retorno o objeto inserido
            return response.status(201).json( created );

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error);
        }

    }

    public async validate(request: Request, response: Response) {

        try {

            //To-do: pegar o usuario e senha do request body
            const { username, password } = request.body;

            //Instancio um Repository da classe User
            const repository = getRepository(User);

            //To-do: Validar o usuario
            let foundUser = await repository.findOne({email: username}); //Select * from user where email = 'xpto'

            //To-do: Se usuario inválido, responder "Usuário Inválido"
            if (!foundUser) {
                throw new AppException('Usuário inválido', 'auth-invalid-username', 403);
            }

            //To-do: Validar a senha: se senha inválida, responder "Senha Inválida"
            if (foundUser.password != password) {
                throw new AppException('Senha inválida', 'auth-invalid-password', 403);
            }

            //To-do: Se usuário e senha corretos, devolver um token (JWT) com os dados básicos do usuário
            const user = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                avatar: foundUser.avatar
            }
            
            //Carrega a chave da criptografia
            const criptoKey = process.env.CRIPTO_KEY as string;

            //Monta o token para ser retornado
            const token = sign(user, criptoKey, {
                expiresIn: '1d'
            })

            return response.json({ token: token, user: user })
        } catch (e) {
            const error = e as AppException;
            response.status(error.code).json(error);
        }

    }

}

export default new AuthController();