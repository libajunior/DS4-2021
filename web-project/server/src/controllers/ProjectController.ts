import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Project } from "../models/Project";
import { AppException } from '../exceptions/AppException';

class ProjectController {

    //Retorno TODOS os registros
    public async index(request: Request, response: Response) {
       try {
            //Instancio um repositório da classe Project
            const repository = getRepository(Project);

            //Buscar TODOS os projetos do banco
            const projects = await repository.find()

            //Retorno a lista de projetos
            return response.json(projects);
       } catch (e) {
           const error = e as AppException;
           return response.status(error.code).json(error)
       } 
    }

    //Retorno o projeto conforme o ID vindo pro request param
    public async show(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { id } = request.params;

            //Validar se veio o ID por request params
            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            //Instancio um repositório da classe Project
            const repository = getRepository(Project);

            //Busco o projeto com o ID passado por parametro
            const found = await repository.findOne(id);

            //Se não encontrar, retorna 404
            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            //Retorno o projeto
            return response.json(found);
        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     //Adiciono um projeto 
     public async create(request: Request, response: Response) {
        try {

            //Instancio um repositório da classe Project
            const repository = getRepository(Project);

            //Crio uma instância de Project a partir do JSON que veio por request body
            const project = await repository.save(request.body);

            //Retorno o objeto inserido
            return response.status(201).json(project);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     //Atuaslizo um projeto
     public async update(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { id } = request.params;

            //Pega os dados que devem ser atualizados
            const novo = request.body;

            //Validar se veio o ID por request params
            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            //Instancio um repositório da classe Project
            const repository = getRepository(Project);

            //Busco o projeto com o ID passado por parametro
            const found = await repository.findOne(id);

            //Se não encontrar, retorna 404
            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            //Atualizo o projeto com os novos dados vindo do request body
            repository.update(found.id, novo);

            //Atualizo o ID do objeto novo
            novo.id = found.id;

            //Retorno o objeto atualizado
            return response.json(novo);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     //Removo o projeto
     public async remove(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { id } = request.params;

            //Validar se veio o ID por request params
            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            //Instancio um repositório da classe Project
            const repository = getRepository(Project);

            //Busco o projeto com o ID passado por parametro
            const found = await repository.findOne(id);

            //Se não encontrar, retorna 404
            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            //Removo o objeto
            repository.delete(found);

            //Retorno o status 204 avisando que foi excluído e não tem retorno
            return response.status(204).json();
        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        }
     }
}

export default new ProjectController();