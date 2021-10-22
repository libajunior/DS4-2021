import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Project } from "../models/Project";
import { StatusColumn } from "../models/StatusColumn";
import { AppException } from '../exceptions/AppException';

class StatusColumnController {

    public async create(request: Request, response: Response) {
        try {
            //Pegio o ID do projeto para verificar se ele existe
            const { projectId } = request.params;

            //Pega do corpo da requestuisição a nova coluna
            const newStatusColumn = request.body;

            //Instancio um repositório da classe Project
            const repositoryProject = getRepository(Project);

            //Busco no banco se exisate um projeto com o ID passado por parametro
            const foundProject = await repositoryProject.findOne(projectId);

            if (!foundProject) {
            throw new AppException('Projeto não encontrado', 'not-found', 404);
            }

            //Atribuo o projeto encontrado ao statusColumn
            newStatusColumn.project = foundProject;

            //Instancio um repositório da classe StatusColumn
            const repository = getRepository(StatusColumn);

            //Crio uma instância de StatusColumn a partir do JSON que veio por request body
            const statusColumn = await repository.save(newStatusColumn);

            //Retorno o objeto inserido
            return response.status(201).json(statusColumn);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
    }
}

export default new StatusColumnController();