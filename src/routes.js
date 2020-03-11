const {Router} = require('express');
const AuthController = require('./app/controllers/authController');
const ProjectController = require('./app/controllers/projectController');
const authMiddleware = require('./app/middlewares/auth');

const routes = Router();

//ROTAS SEM NECESSIDADE DA UTILIZAÇAO DO MIDDLEWARE DE AUTENTICACAO
routes.post('/register', AuthController.register);
routes.post('/authenticate', AuthController.authenticate);

//ROTAS QUE DEMANDAM TOKEN E PASSAM PELO MIDDLEWARE DE AUTENTICACAO
routes.use(authMiddleware);
routes.get('/projects', ProjectController.index);
routes.get('/projects/:projectId', ProjectController.show);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:projectId', ProjectController.update);
routes.delete('/projects/:projectId', ProjectController.delete);


module.exports = routes;