import { Router } from 'express';
import AuthController from './controllers/AuthController';
import ProjectController from './controllers/ProjectController';
import StatusColumnController from './controllers/StatusColumnController';
import TaskController from './controllers/TaskController';
import TokenController from './controllers/TokenController';

const routes = Router();

//AUTH
routes.post('/auth/signup', AuthController.create);
routes.post('/auth/signin', AuthController.validate);

//PROJECTS
routes.route('/projects')
    .all(TokenController.validate)
    .get(ProjectController.index)
    .post(ProjectController.create);

routes.route('/projects/:id')
    .all(TokenController.validate)
    .get(ProjectController.show)
    .put(ProjectController.update)
    .delete(ProjectController.remove);

//STATUS COLUMNS
routes.route('/projects/:projectId/statuscolumns')
    .all(TokenController.validate)    
    .post(StatusColumnController.create);

//TASKS
routes.route('/projects/:projectId/tasks')
    .all(TokenController.validate)    
    .get(TaskController.findByProject)
    .post(TaskController.create);

routes.route('/projects/:projectId/tasks/:taskId')
    .put(TaskController.update);    
    
export default routes;
