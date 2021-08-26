import { Router } from 'express';
import AuthController from './controllers/AuthController';
import ProjectController from './controllers/ProjectController';
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

export default routes;
