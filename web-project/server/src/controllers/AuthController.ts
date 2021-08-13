import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { sign } from 'jsonwebtoken'


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
            
        } catch (error) {
            return response.status(error.code).json({message: error.message});
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
                return response.status(403).json({message: 'auth-invalid-username'});
            }

            //To-do: Validar a senha: se senha inválida, responder "Senha Inválida"
            if (foundUser.password != password) {
                return response.status(403).json({message: 'auth-invalid-password'});
            }

            //To-do: Se usuário e senha corretos, devolver um token (JWT)
            const payload = {user: foundUser};
            const token = sign(payload, 'materdei', {
                expiresIn: '1h'
            })

            return response.json({ token: token })
        } catch (error) {
            response.status(error.code).json({message: error.message});
        }

    }

}

export default new AuthController();