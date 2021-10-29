import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Project } from "../models/Project";
import { Task } from "../models/Task";
import { AppException } from '../exceptions/AppException';

class TaskController {

    public async findByProject(request: Request, response: Response) {
        try {
            //Pegio o ID do projeto para verificar se ele existe
            const { projectId } = request.params;

            //Instancio um repositório da classe Project
            const repositoryProject = getRepository(Project);

            //Busco no banco se exisate um projeto com o ID passado por parametro
            const foundProject = await repositoryProject.findOne(projectId);

            if (!foundProject) {
                throw new AppException('Projeto não encontrado', 'not-found', 404);
            }

            //Instancio um repositório da classe Task
            const repository = getRepository(Task);

            const tasks = await repository.find({
                where: {
                    project: foundProject
                }
            });

            console.table(tasks)

            //Retorno as tarefas do projeto
            return response.json(tasks);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
    }

    public async create(request: Request, response: Response) {
        try {
            //Pegio o ID do projeto para verificar se ele existe
            const { projectId } = request.params;

            //Pega do corpo da requestuisição a nova coluna
            const newTask = request.body;

            //Instancio um repositório da classe Project
            const repositoryProject = getRepository(Project);

            //Busco no banco se exisate um projeto com o ID passado por parametro
            const foundProject = await repositoryProject.findOne(projectId);

            if (!foundProject) {
                throw new AppException('Projeto não encontrado', 'not-found', 404);
            }

            //Atribuo o projeto encontrado ao statusColumn
            newTask.project = foundProject;

            //Instancio um repositório da classe Task
            const repository = getRepository(Task);

            //Crio uma instância de Task a partir do JSON que veio por request body
            const statusColumn = await repository.save(newTask);

            //Retorno o objeto inserido
            return response.status(201).json(statusColumn);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
    }
}

export default new TaskController();